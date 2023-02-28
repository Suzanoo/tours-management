const fs = require('fs');
const dotenv = require('dotenv').config();

const connectDB = require('../config/db');

const MODEL = require('../models/productModel');

const HOST = process.env.DATABASE_LOCAL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

connectDB(HOST);

// READ JSON FILE
const SCHEMA = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await MODEL.create(SCHEMA);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await MODEL.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

/*
How to use??
% node /Users/suzanoo/Dev/DJ/node/gemini/backend/data/query.js --delete
% node /Users/suzanoo/Dev/DJ/node/gemini/backend/data/query.js --import
*/
