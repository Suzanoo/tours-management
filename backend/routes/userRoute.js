const express = require('express');
const user = require('../controller/userController');
const auth = require('../controller/authController');

const router = express.Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.post('/forgot-pwd', auth.forgotPassword);
router.patch('/reset-pwd/:token', auth.resetPassword);

// Protect routes
router.use(auth.protect);

router.get('/personal', user.getMe, user.getUser);
router.patch('/updateMyPassword', auth.updatePassword);
router.patch('/updateUserData', user.updateUserData);
router.delete('/deleteCurrentUser', user.deleteCurrentUser);

// Admin controller
router.use(auth.restrictTo('admin'));

router.route('/').get(user.getAllUsers).post(user.createUser);

router
  .route('/:id')
  .get(user.getUser)
  .patch(user.updateUser)
  .delete(user.deleteAccount);

module.exports = router;
