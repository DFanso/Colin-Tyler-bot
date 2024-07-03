const mongoose = require('mongoose');
const config = require('../config.json');

const { MONGO_URI } = config;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected...');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error', err);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
