const express = require('express');

const authCtrl = require('../controller/authController');
const tourCtrl = require('../controller/tourController');

const router = express.Router();

router
  .route('/')
  .get(tourCtrl.getAllTours)
  .post(authCtrl.protect, authCtrl.restrictTo('admin'), tourCtrl.createTour);

router
  .route('/:id')
  .get(tourCtrl.getTour)
  .patch(authCtrl.protect, authCtrl.restrictTo('admin'), tourCtrl.updateTour)
  .delete(authCtrl.protect, authCtrl.restrictTo('admin'), tourCtrl.deleteTour);

module.exports = router;
