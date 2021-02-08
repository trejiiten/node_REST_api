const {
  sequelize,
  defaults,
  Environment,
  Feature,
  Scenario,
  Step,
  Environment_Feature,
} = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const steps = await Step.findAll();
      res.status(201).json(steps);
    } catch (err) {
      next(err);
    }
  },

  // newStep: async (req, res, next) => {
  //   try {
  //     const newStep = new Step(req.body);
  //     const step = await newStep.save();
  //     res.status(201).json(step);
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  getStep: async (req, res, next) => {
    try {
      const { stepId } = req.params;
      const step = await Step.findByPk(stepId);
      res.status(200).json(step);
    } catch (err) {
      next(err);
    }
  },
};
