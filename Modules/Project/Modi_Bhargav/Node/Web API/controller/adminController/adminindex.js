const express = require("express");
const router1 = express.Router();
const Cars = require("./carData/DriverCars");
const CityArea = require("./carData/CityAndArea");
const enquiryData = require("./carData/EquiryData");
const driverLogin = require("./AdminLogin/adminLogin");
const driverTrips = require("../../domin/driversTrip");
const VerifyOtp = require("../../domin/verifyOtp");

router1.use("/carsDriver", Cars);
router1.use("/cityarea", CityArea);
router1.use("/driverEnquiry", enquiryData);
router1.use("/driverLogin", driverLogin);
router1.use("/driverTrips", driverTrips);
router1.use("/verifyOtp", VerifyOtp);

module.exports = router1;
