const express = require("express");
const router = express.Router();

const Step = require("../models/step");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Step.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const step = new Step({
    _id: new mongoose.Types.ObjectId(),
    testcase_step_title: req.body.testcase_step_title,
    testcase_step_status: req.body.testcase_step_status,
    error_message: req.body.error_message,
  });
  step
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /steps",
        createdFeature: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:stepId", (req, res, next) => {
  const id = req.params.stepId;
  Step.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: `No valid entry exists with the ID: ${id}`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:stepId", (req, res, next) => {
  const id = req.params.stepId;
  const updateOperations = {};
  for (const ops of req.body) {
    updateOperations[ops.propName] = ops.value;
  }
  Step.update({ _id: id }, { $set: updateOperations })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((er) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
