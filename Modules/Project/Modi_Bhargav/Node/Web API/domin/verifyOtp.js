const createOtp = require("../otpValidation/otpSend");
const express = require("express");
const otpRouter = express.Router({ mergeParams: true });

class ConfirmOTP {
  static async verifyotpData(req, res) {
    const ID = parseInt(req.params.otp);
    let verifyCode = createOtp.verifyOTP(ID);
    if (verifyCode == true) {
      res.send("Your Otp Is valid");
    } else {
      res.send("Your Otp Is Not valid");
    }
  }
}
otpRouter.post("/:otp", ConfirmOTP.verifyotpData);

module.exports = otpRouter;
