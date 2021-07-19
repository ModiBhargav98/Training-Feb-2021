const Trips = require("../models/DriverTrip");
const express = require("express");
const driverTripRouter = express.Router({ mergeParams: true });

class DriverTrip {
  static async driverTrips(req, res) {
    const driverhistory = await Trips.find();

    try {
      res.send(driverhistory);
    } catch (ex) {
      console.log(ex.message);
    }
  }
  static async driverTripsFind(req, res) {
    const ID = parseInt(req.params.id);

    const driverTrips = await Trips.find({ driverNumber: ID });

    if (driverTrips.length === 0) {
      return res.status(404).json({
        message: "Not a Any Trips Avilables",
      });
    }
    try {
      res.send(driverTrips);
    } catch (ex) {
      console.log(ex.message);
    }
  }

  static async TripsFind(req, res) {
    const ID = req.params.id;
    const TripId = await Trips.find({ _id: ID });

    if (TripId.length === 0) {
      return res.status(404).json({
        message: "Not a Any Trips Avilables",
      });
    }
    try {
      res.send(TripId);
    } catch (ex) {
      console.log(ex.message);
    }
  }

  static async UpdateData(req, res) {
    const ID = req.params.id;
    const dataUpdate = await Trips.find({ _id: ID });
    if (dataUpdate.length == 0)
      return res.status(404).send("Your Data Is Not Found");
    const newData = req.body;
    console.log(newData);
    for (let i in newData) {
      dataUpdate[0][i] = newData[i];
    }
    try {
      const result = await dataUpdate[0].save();
      res.send(result);
    } catch (ex) {
      for (let field in ex.errors) {
        res.status(404).send(ex.errors[field].message);
      }
    }
  }
}
driverTripRouter.get("/", DriverTrip.driverTrips);
driverTripRouter.get("/:id", DriverTrip.driverTripsFind);
driverTripRouter.get("/trip/:id", DriverTrip.TripsFind);
driverTripRouter.put("/:id", DriverTrip.UpdateData);
module.exports = driverTripRouter;
