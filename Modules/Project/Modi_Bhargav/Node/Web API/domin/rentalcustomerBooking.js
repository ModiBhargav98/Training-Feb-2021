const Trips = require("../models/DriverTrip");
const carDriver = require("../models/CarsAndDrivers");
const createOtp = require("../otpValidation/otpSend");
const express = require("express");
const rentalcustomerRouter = express.Router({ mergeParams: true });

class rentalcustomerBooking {
  static async cusbookingDone(req, res) {
    const ID = parseInt(req.params.id);

    const newTrip = {
      customerNumber: ID,
      customerEmail: req.body.customerEmail,
      ScheduleDate: req.body.ScheduleDate,
      Img: req.body.Img,
      Schedule: req.body.Schedule,
      Source: req.body.pickUp,
      Package: req.body.Package,
      driverEmail: req.body.driverEmail,
      driverNumber: req.body.driverNumber,
      registrationNumber: req.body.registrationNumber,
      carType: req.body.carType,
      fareAmount: req.body.distance * req.body.fareAmount,
      Status: "Pending",
    };
    const Number = newTrip.registrationNumber;
    const sendOtp = createOtp.createOTP();
    const carDriverData = await carDriver.find({ registrationNumber: Number });

    const addData = new Trips(newTrip);
    try {
      const result = await addData.save();
      res.status(200).send({ carDriverData, result, sendOtp });
    } catch (ex) {
      console.log(ex.message);
    }
  }
}
rentalcustomerRouter.post("/", rentalcustomerBooking.cusbookingDone);

module.exports = rentalcustomerRouter;
