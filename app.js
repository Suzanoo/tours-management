const express = require('express');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./backend/utils/appError');
const globalErrorHandler = require('./backend/controller/errorController');

const adminRoute = require(`${__dirname}/backend/routes/adminRoute`);
const userRoute = require(`${__dirname}/backend/routes/userRoute`);
const tourRoute = require(`${__dirname}/backend/routes/tourRoute`);
const reviewRoute = require(`${__dirname}/backend/routes/reviewRoute`);
const bookingRoute = require(`${__dirname}/backend/routes/bookingRoute`);
const textGenRoute = require(`${__dirname}/backend/routes/textGenRoute`);

// Express app and body parser with limit, reading data from body into req.body
const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 1.1) MIDDLEWARES for SECURITY
// Set security HTTP headers
app.use(helmet());

// Limit requests from same API --> see limit value in headers
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// 1.2) MIDDLEWARES
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serving static files
app.use(express.static(`${__dirname}/public`));

// middleware for showing request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);

  next();
});

// ROUTE HANDLER ----------------------------------
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

app.use('/api/v1/text-gen', textGenRoute);

// Route error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

/*

INFLUENCES:
https://github.com/saptaparneechaudhuri/user-auth-youtube
https://codepen.io/z-/pen/OBPJKK

*/
