require('dotenv').config();

// Connect to Database
const connectDB = require('./backend/config/db');
const HOST = process.env.DATABASE_LOCAL;
connectDB(HOST);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

// Import express application
const app = require('./app');

// Port
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`[INFO] Running on port ${port}...`);
});

// Handle unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
