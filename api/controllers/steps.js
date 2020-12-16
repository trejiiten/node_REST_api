const Step = require("../models/step");

module.exports = {
  index: async (req, res, next) => {
    try {
      const steps = await Step.find({});
      res.status(201).json(steps);
    } catch (err) {
      next(err);
    }
  },

  newStep: async (req, res, next) => {
    try {
      const newStep = new Step(req.body);
      const step = await newStep.save();
      res.status(201).json(step);
    } catch (err) {
      next(err);
    }
  },

  getStep: async (req, res, next) => {
    try {
      const { stepId } = req.params;
      const step = await Step.findById(stepId);
      res.status(200).json(step);
    } catch (err) {
      next(err);
    }
  },
};
