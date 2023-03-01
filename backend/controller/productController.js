const CRUD = require('./factoryFunction');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const geocoder = require('../utils/geocode');

// get location geodata from mapquest API
const geoLocation = async (address) => {
  try {
    const mapquest_response = await geocoder.geocode(address);
    return mapquest_response;
  } catch (error) {
    return new AppError('Server error', 500);
  }
};

exports.createProduct = catchAsync(async (req, res, next) => {
  const productData = req.body;

  const startLocationGeo = await geoLocation(productData.startLocation.address);
  console.log(startLocationGeo);

  productData.startLocation = {
    type: 'Point',
    coordinates: [startLocationGeo[0].longitude, startLocationGeo[0].latitude],
    formattedAddress: startLocationGeo[0].formattedAddress,
    address: productData.address, // undefined in model pre-hook later
  };

  if ('location' in productData === true) {
    const locationGeo = await geoLocation(productData.location.address);
    productData.location = {
      type: 'Point',
      coordinates: [locationGeo[0].longitude, locationGeo[0].latitude],
      formattedAddress: locationGeo[0].formattedAddress,
      address: productData.address, // undefined in model pre-hook later
    };
  }

  const doc = await Product.create(productData);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

// exports.createProduct = CRUD.createOne(Product);

exports.getProduct = CRUD.getOne(Product);
exports.getAllProducts = CRUD.getAll(Product);

exports.updateProduct = CRUD.updateOne(Product);

exports.deleteProduct = CRUD.deleteOne(Product);

/*
{
    "startLocation": {
      "description": "NYC, USA",
      "type": "Point",
      "coordinates": [100.8825, 12.9236],
      "address": "Manhattan, NY 10036, USA"
    },
    "name": "Pattaya Night Live",
    "duration": 7,
    "maxGroupSize": 12,
    "difficulty": "easy",
    "price": 1497,
    "summary": "Enjoy the Happiest Live in one of the best places in the world",
    "description": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!\nDolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, exercitation ullamco laboris nisi ut aliquip. Lorem ipsum dolor sit amet, consectetur adipisicing elit!",
    "imageCover": "tour-9-cover.jpg",
    "startDates": [
        "2021-12-16T10:00:00.000Z",
        "2022-01-16T10:00:00.000Z",
        "2022-12-12T10:00:00.000Z"
    ],
    "secretTour": false
  }
*/
