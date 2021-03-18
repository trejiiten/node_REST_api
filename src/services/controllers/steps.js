const {
  sequelize,
  defaults,
  Environment,
  Feature,
  Scenario,
  Step,
  Environment_Feature,
} = require("../../db/models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const steps = await Step.findAll();
      steps.length == 0
        ? res.status(404).json({
            api_notification: { message: "There were no records found" },
          })
        : res.status(200).json(steps);
    } catch (err) {
      next(err);
      res.status(500).send();
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
    const stepId = req.params.id;
    try {
      const step = await Step.findByPk(stepId);
      res.status(200).json(step);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },
};
