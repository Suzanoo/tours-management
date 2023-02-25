const express = require('express');

const tourCtrl = require('../controller/tourController');
const authCtrl = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(tourCtrl.getAllTours)
  .post(authCtrl.protect, authCtrl.restrictTo('admin'), tourCtrl.createTour);

router.route('/:id').get(tourCtrl.getTour);

router.route('/:id').patch(tourCtrl.updateTour);

router.route('/:id').delete(tourCtrl.deleteTour);

module.exports = router;
