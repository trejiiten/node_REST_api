const express = require("express");
const router = express.Router();

const Feature = require("../models/feature");
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
  Feature.find()
    // .select(
    //   "feature_file_title feature_file_type feature_file_location scenarios testcase_title testcase_steps total_tests total_steps time_start time_end total_time _id"
    // )
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        features: docs.map((doc) => {
          return {
            feature_file_title: doc.feature_file_title,
            feature_file_type: doc.feature_file_type,
            feature_file_location: doc.feature_file_location,
            scenarios: doc.scenarios,
            total_tests: doc.total_tests,
            total_steps: doc.total_steps,
            time_start: doc.time_start,
            time_end: doc.time_end,
            total_time: doc.total_time,
            _id: doc.id,
            request: {
              type: "GET",
              url: `http://localhost:3000/features/${doc._id}`,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const feature = new Feature({
    // _id: new mongoose.Types.ObjectId(),
    feature_file_title: req.body.feature_file_title,
    feature_file_type: req.body.feature_file_type,
    feature_file_location: req.body.feature_file_location,
    scenarios: req.body.scenarios,
    total_tests: req.body.total_tests,
    total_steps: req.body.total_steps,
    time_start: req.body.time_start,
    time_end: req.body.time_end,
    total_time: req.body.total_time,
  });
  feature
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /features",
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

router.get("/:featureId", (req, res, next) => {
  const id = req.params.featureId;
  Feature.findById(id)
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

router.patch("/:featureId", (req, res, next) => {
  const id = req.params.featureId;
  const updateOperations = {};
  for (const ops of req.body) {
    updateOperations[ops.propName] = ops.value;
  }
  Feature.update({ _id: id }, { $set: updateOperations })
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
