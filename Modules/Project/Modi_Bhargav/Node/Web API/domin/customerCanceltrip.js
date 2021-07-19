const TripData = require("../models/DriverTrip");
const express = require("express");
const customerCanceltrip = express.Router({ mergeParams: true });

class CustomerCanceltrip {
  static async cancelTripDone(req, res) {
    const ID = req.params.id;

    const reasonTrip = req.body;
    const customerTrip = await TripData.findOne({ _id: ID });
    if (customerTrip !== null) {
      customerTrip.Reason = reasonTrip.reason;
      customerTrip.save();
      res.status(200).send("data save suucessfully");
    } else {
      res.status(404).send("Not data Id Show");
    }
  }
}
customerCanceltrip.post("/", CustomerCanceltrip.cancelTripDone);
module.exports = customerCanceltrip;
