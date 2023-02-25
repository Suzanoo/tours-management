const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const handleEmail = require('../utils/handleEmail');

// ----------------------
// CREATE JWT TOKEN:
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// Security XSS: store JWT in cookie & set expiry date
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  // Cookie: name='jwt', value=token, options=...
  res.cookie('jwt', token, cookieOptions);

  // do not display password in output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// ----------------------
// SIGNUP
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  createSendToken(newUser, 201, res);
});

// ----------------------
// LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body; // note: use ES6 Oject destructuring format

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});
// ----------------------
// LOGOUT
exports.logout = (req, res) => {
  // replace cookie 'jwt token' with a cookie name='jwt', value=loged-out' without token
  res.cookie('jwt', 'logged-out', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// ----------------------
// PROTECT ROUTE
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  // Get from headers or
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    // Get from cookie
  } else if (req.cookie.jwt) {
    token = req.cookie.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token : use promisify() from util package
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // grant access
  req.user = currentUser;
  next();
});

// ----------------------
// ROLES
// Note: Middleware cannot get arguments, so use wraper fuction to parse roles instead
// and return middleware function itself
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

// ----------------------
// FORGET PASSWORD
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) If user exist, generate the random reset token
  const resetToken = user.generateTokenForPasswordReset();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const URL = `http://localhost:3000/${resetToken}`;
  // const resetURL = `${req.protocol}://${req.get(
  //   'host'
  // )}/reset-pwd/${resetToken}`;

  const message = `Forgot your password? Click link to create new. : ${URL}`;

  try {
    await handleEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 15 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Reset token has been sent to the email provided',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

// ----------------------
// RESET PASSWORD
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1.Encrypt token that recieved as an url param and compare it with the token saved in the database,
  const encryptedTokenString = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // the passwordResetTokenExpiresIn property should be greater than the time right now
  // console.log(encryptedTokenString);

  // 2.Get user based on the token
  const user = await User.findOne({
    passwordResetToken: encryptedTokenString,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 3.If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4.Update changedPasswordAt property for the user
  // 5.Log the user in, send JWT
  createSendToken(user, 200, res);
});

// ----------------------
// UPDATE CURRENT USER PASSWORD
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
