const Cars = require("../../../models/CarsAndDrivers");
const express = require("express");
const cardriverRouter = express.Router();

class CarsDrivers {
  static async carList(req, res) {
    const Cardata = await Cars.find();
    res.send(Cardata);
  }

  static async carFind(req, res) {
    const ID = parseInt(req.params.id);
    const specificData = await Cars.find({ registrationNumber: ID });
    if (specificData.length == 0)
      return res.status(404).send("Your Data is Not Avilable");
    res.status(200).send(specificData);
  }

  static async InsertData(req, res) {
    const addData = req.body;
    console.log(addData);
    const newData = new Cars(addData);
    try {
      const result = await newData.save();
      res.status(200).send(result);
    } catch (ex) {
      for (let field in ex.errors) {
        res.status(404).send(ex.errors[field].message);
      }
    }
  }

  static async UpdateData(req, res) {
    const ID = parseInt(req.params.id);
    const dataUpdate = await Cars.find({ registrationNumber: ID });
    if (dataUpdate.length == 0)
      return res.status(404).send("Your Data Is Not Found");
    const newData = req.body;
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

  static async UpdateRating(req, res) {
    const ID = parseInt(req.params.id);
    const dataUpdate = await Cars.findOne({ registrationNumber: ID });
    if (dataUpdate.length == 0)
      return res.status(404).send("Your Data Is Not Found");
    console.log(dataUpdate.User);
    console.log(dataUpdate.Rating);
    const totalUser = dataUpdate.User + req.body.User;
    const Rating = dataUpdate.Rating + req.body.Rating;
    const newData = {
      User: totalUser,
      Rating: Rating,
    };
    console.log(newData);
    for (let i in newData) {
      dataUpdate[i] = newData[i];
    }
    try {
      const result = await dataUpdate.save();
      console.log(result);
      res.send(result);
    } catch (ex) {
      console.log(ex.message);
    }
  }

  static async DeleteData(req, res) {
    const ID = parseInt(req.params.id);

    const dataDelete = await Cars.find({ registrationNumber: ID });

    if (dataDelete.length == 0)
      return res.status(404).send("Your Id Is Not Found");

    const remove = await Cars.deleteOne({ registrationNumber: ID });

    res.send(dataDelete);
  }
}

cardriverRouter.get("/", CarsDrivers.carList);
cardriverRouter.get("/:id", CarsDrivers.carFind);
cardriverRouter.post("/", CarsDrivers.InsertData);
cardriverRouter.put("/:id", CarsDrivers.UpdateData);
cardriverRouter.put("/:id/Rating", CarsDrivers.UpdateRating);
cardriverRouter.delete("/:id", CarsDrivers.DeleteData);

module.exports = cardriverRouter;
