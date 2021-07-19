const enquiryData = require("../../../models/driverEnquiry");
const express = require("express");
const enquiryRouter = express.Router();

class EnquiryData {
  static async driverList(req, res) {
    const allData = await enquiryData.find();
    res.send(allData);
  }

  static async InsertData(req, res) {
    const addData = req.body;
    const newData = new enquiryData(addData);
    try {
      const result = await newData.save();
      res.status(200).send(result);
    } catch (ex) {
      console.log(ex.message);
    }
  }

  static async DeleteData(req, res) {
    const ID = parseInt(req.params.id);

    const dataDelete = await enquiryData.find({ phoneNumber: ID });

    if (dataDelete.length == 0)
      return res.status(404).send("Your Id Is Not Found");

    const remove = await enquiryData.deleteOne({ phoneNumber: ID });
    res.send(dataDelete);
  }
}

enquiryRouter.get("/", EnquiryData.driverList);
enquiryRouter.post("/", EnquiryData.InsertData);
enquiryRouter.delete("/:id", EnquiryData.InsertData);
module.exports = enquiryRouter;
