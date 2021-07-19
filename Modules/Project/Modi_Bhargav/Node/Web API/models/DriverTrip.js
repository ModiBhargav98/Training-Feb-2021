const mongoose = require("mongoose");

const drivertripSchema = new mongoose.Schema({
  customerNumber: {
    type: Number,
  },
  driverEmail: {
    type: String,
  },
  driverNumber: {
    type: Number,
  },
  Img: {
    type: String,
  },
  ScheduleDate: {
    type: Date,
  },
  ScheduleDepart: {
    type: Date,
  },
  dateTimeReturn: {
    type: Date,
  },
  Journey: {
    type: String,
  },
  Schedule: {
    type: String,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  Source: {
    type: String,
  },
  Destination: {
    type: String,
  },
  Package: {
    type: String,
  },
  carType: {
    type: String,
  },
  carModel: {
    type: String,
  },
  carNumber: {
    type: String,
  },
  registrationNumber: {
    type: Number,
  },
  fareAmount: {
    type: Number,
  },
  Reason: {
    type: String,
  },
  Status: {
    type: String,
  },
  otpVerify: {
    type: String,
  },
});

const DriverTrip = mongoose.model("DriverTrips", drivertripSchema);

module.exports = DriverTrip;
