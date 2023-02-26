const express = require('express');
const bookingCtrl = require('../controller/bookingController');
const authCtrl = require('../controller/authController');

const router = express.Router();

router.use(authCtrl.protect);

// router.get('/checkout-session/:tourId', bookingCtrl.getCheckoutSession);

router.use(authCtrl.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingCtrl.getAllBookings)
  .post(bookingCtrl.createBooking);

router
  .route('/:id')
  .get(bookingCtrl.getBooking)
  .patch(bookingCtrl.updateBooking)
  .delete(bookingCtrl.deleteBooking);

module.exports = router;
