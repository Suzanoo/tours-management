const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: [true, 'Please define tour name'],
    unique: true,
    maxlength: [50, 'Name must less than 50 characters'],
    minlength: [5, 'Name must more than 5 characters'],
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'Please define a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Please define a maximum group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'Please define a difficulty of tour'],
    enum: {
      values: ['easy', 'medium', 'difficulty'],
      message: 'Difficulty is either: easy, medium, difficult',
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false,
  },
  startLocation: {
    // GeoJSON
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
});

const Tour = mongoose.model('tours', tourSchema);

module.exports = Tour;
