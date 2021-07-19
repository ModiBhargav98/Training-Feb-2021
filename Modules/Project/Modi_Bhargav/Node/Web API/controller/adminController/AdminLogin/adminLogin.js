const Drivers = require("../../../models/CarsAndDrivers");
const express = require("express");
const routerDriver = express.Router();
const jwt = require("jsonwebtoken");

class Login {
  static async driverLogin(req, res) {
    const driverData = {
      Email: req.body.Email,
      passWord: req.body.passWord,
    };
    let token = jwt.sign({ driverData }, global.config.secretKey, {
      algorithm: global.config.algorithm,
      expiresIn: "24h",
    });
    const driverDatas = await Drivers.find();
    var flag = 0;
    for (var i of driverDatas) {
      if (driverData.Email == i.Email && driverData.passWord == i.passWord) {
        flag = 1;
        break;
      }
    }
    const driverId = await Drivers.find({ Email: driverData.Email });
    if (flag == 1) {
      res.status(200).send({
        message: "Driver Login Successful",
        Token: token,
        driver: driverId[0],
      });
    } else {
      res.status(401).send({
        message: "Login Failed",
      });
    }
  }
}
routerDriver.post("/", Login.driverLogin);
module.exports = routerDriver;
