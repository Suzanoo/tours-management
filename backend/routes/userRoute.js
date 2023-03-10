const express = require('express');
const userCtrl = require('../controller/userController');
const authCtrl = require('../controller/authController');

const router = express.Router();

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);
router.post('/forgot-pwd', authCtrl.forgotPassword);
router.patch('/reset-pwd/:token', authCtrl.resetPassword);

// Protect routes
router.use(authCtrl.protect);

router.get('/personal', userCtrl.getMe, userCtrl.getUser);
router.patch('/updateMyPassword', authCtrl.updatePassword);
router.patch(
  '/updateUserData',
  userCtrl.uploadProfilePicture,
  userCtrl.resizeProfilePicture,
  userCtrl.updateUserData
);
router.delete('/deleteCurrentUser', userCtrl.deleteCurrentUser);

// Admin controller
router.use(authCtrl.restrictTo('admin'));

router.route('/').get(userCtrl.getAllUsers).post(userCtrl.createUser);

router
  .route('/:id')
  .get(userCtrl.getUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteAccount);

module.exports = router;
