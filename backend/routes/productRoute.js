const express = require('express');

const authCtrl = require('../controller/authController');
const productCtrl = require('../controller/productController');

const router = express.Router();

router
  .route('/')
  .get(productCtrl.getAllProducts)
  .post(
    authCtrl.protect,
    authCtrl.restrictTo('admin'),
    productCtrl.createProduct
  );

router
  .route('/:id')
  .get(productCtrl.getProduct)
  .patch(
    authCtrl.protect,
    authCtrl.restrictTo('admin'),
    productCtrl.updateProduct
  )
  .delete(
    authCtrl.protect,
    authCtrl.restrictTo('admin'),
    productCtrl.deleteProduct
  );

module.exports = router;
