const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`.cyan.underline);
  } catch (e) {
    console.log(e);
    console.log(`Error: ${e.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;

