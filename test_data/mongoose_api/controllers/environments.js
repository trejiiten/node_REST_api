const Environment = require("../models/environment");
const Feature = require("../models/feature");

module.exports = {
  index: async (req, res, next) => {
    try {
      const environments = await Environment.find({});
      res.status(200).json(environments);
    } catch (err) {
      next(err);
    }
  },
  newEnvironment: async (req, res, next) => {
    try {
      const presentEnvironment = await Environment.findOne({
        address: req.body.address,
      });
      if (presentEnvironment) {
        res.status(500).json({
          message:
            "This Environment already exists in the database. Perhaps you want to PATCH?",
          request: {
            type: "PATCH",
            url: `http://localhost:3000/environments/${presentEnvironment._id}`,
          },
        });
      } else {
        const newEnvironment = new Environment(req.body);
        const environment = await newEnvironment.save();
        res.status(200).json(environment);
      }
    } catch (err) {
      next(err);
    }
  },
  getEnvironment: async (req, res, next) => {
    try {
      const { environmentId } = req.params;
      const environment = await Environment.findById(environmentId);
      res.status(200).json(environment);
    } catch (err) {
      next(err);
    }
  },
  updateEnvironment: async (req, res, next) => {
    try {
      const { environmentId } = req.params;
      const newEnvironment = req.body;
      const result = await Environment.findByIdAndUpdate(
        environmentId,
        newEnvironment
      );
      res.status(200).json({ message: `${environmentId} has been updated` });
    } catch (err) {
      next(err);
    }
  },
  getEnvironmentFeatures: async (req, res, next) => {
    try {
      const { environmentId } = req.params;
      const environment = await Environment.findById(environmentId).populate(
        "features"
      );
      res.status(200).json(environment.features);
    } catch (err) {
      next(err);
    }
  },
  newEnvironmentFeature: async (req, res, next) => {
    try {
      const { environmentId } = req.params;
      const newFeature = new Feature(req.body);
      const environment = await Environment.findById(environmentId);
      newFeature.environments = environment;
      await newFeature.save();
      environment.features.push(newFeature);
      await environment.save();
      res.status(201).json(newFeature);
    } catch (err) {
      next(err);
    }
  },
};
