const customerTrips = require("../models/DriverTrip");
const express = require("express");
const cusTripsRouter = express.Router({ mergeParams: true });

class customerTrip {
  static async custripFind(req, res) {
    const ID = parseInt(req.params.id);

    const customerTriphistory = await customerTrips.find({
      customerNumber: ID,
    });
    try {
      res.send(customerTriphistory);
    } catch (ex) {
      console.log(ex.message);
    }
  }
}
cusTripsRouter.get("/", customerTrip.custripFind);

module.exports = cusTripsRouter;
