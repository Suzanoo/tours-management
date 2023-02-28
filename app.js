const express = require('express');
const morgan = require('morgan');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./backend/utils/appError');
const globalErrorHandler = require('./backend/controller/errorController');

const adminRoute = require(`${__dirname}/backend/routes/adminRoute`);
const userRoute = require(`${__dirname}/backend/routes/userRoute`);
const productRoute = require(`${__dirname}/backend/routes/productRoute`);
const bookingRoute = require(`${__dirname}/backend/routes/bookingRoute`);

// Express app and body parser with limit, reading data from body into req.body
const app = express();
app.use(express.json({ limit: '10kb' }));

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
app.use(express.static(`${__dirname}/static`));

// middleware for showing request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);

  next();
});

// ROUTE HANDLER ----------------------------------
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/booking', bookingRoute);

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
