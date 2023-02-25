const CRUD = require('./factoryFunction');
const Tour = require('../models/tourModel');

exports.createTour = CRUD.createOne(Tour);

exports.getTour = CRUD.getOne(Tour);
exports.getAllTours = CRUD.getAll(Tour);

exports.updateTour = CRUD.updateOne(Tour);

exports.deleteTour = CRUD.deleteOne(Tour);
