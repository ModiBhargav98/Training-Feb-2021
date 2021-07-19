const mongoose = require("mongoose");

const citydriverSchema = new mongoose.Schema({
  driverName: {
    type: String,
  },
  Img: {
    type: String,
  },
  passWord: {
    type: String,
  },
  Gender: {
    type: String,
  },
  licenseNumber: {
    type: Number,
  },
  Email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  Source: {
    type: String,
  },
  Package: [],
  registrationNumber: {
    type: String,
  },
  carType: {
    type: String,
  },
  carNumber: {
    type: String,
  },
  carModel: {
    type: String,
  },
  kilometerPrice: {
    type: Number,
  },
  User: {
    type: Number,
  },
  Rating: {
    type: Number,
  },
});

const CarDriver = mongoose.model("CarsAndDrivers", citydriverSchema);

module.exports = CarDriver;
