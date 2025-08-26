const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/TrackFitx");
    console.log("DB connection success");
  } catch (err) {
    console.error("DB not connected:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
