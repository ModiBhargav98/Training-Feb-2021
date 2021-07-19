const Trips = require("../models/DriverTrip");
const outstationDriver = require("../models/CarsAndDrivers");
const createOtp = require("../otpValidation/otpSend");
const express = require("express");
const outstationcustomerRouter = express.Router({ mergeParams: true });

class outstationcustomerBooking {
  static async cusbookingDone(req, res) {
    const ID = parseInt(req.params.id);
    const newTrip = {
      customerNumber: ID,
      Source: req.body.Source,
      Destination: req.body.Destination,
      ScheduleDepart: req.body.ScheduleDepart,
      dateTimeReturn: req.body.dateTimeReturn,
      Journey: req.body.Journey,
      Img: req.body.Img,
      driverEmail: req.body.driverEmail,
      driverNumber: req.body.driverNumber,
      registrationNumber: req.body.registrationNumber,
      carType: req.body.carType,
      fareAmount: req.body.distance * req.body.fareAmount,
      Status: "Pending",
    };
    const Number = newTrip.registrationNumber;
    const sendOtp = createOtp.createOTP();

    const carDriverData = await outstationDriver.find({
      registrationNumber: Number,
    });

    const addData = new Trips(newTrip);
    try {
      const result = await addData.save();
      res.status(200).send({ carDriverData, result, sendOtp });
    } catch (ex) {
      console.log(ex.message);
    }
  }
}
outstationcustomerRouter.post("/", outstationcustomerBooking.cusbookingDone);

module.exports = outstationcustomerRouter;
