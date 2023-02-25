require('dotenv').config();
const connectDB = require('./backend/config/db');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

// Import express application
const app = require('./app');

// Connect to Database
const HOST = process.env.DATABASE_LOCAL;
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  connectDB(HOST);
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
