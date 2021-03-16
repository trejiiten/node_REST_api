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
      const scenarios = await Scenario.findAll();
      res.status(201).json(scenarios);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },


  getScenario: async (req, res, next) => {
    const scenarioId = req.params.id;
    try {
      const scenario = await Scenario.findByPk(scenarioId);
      res.status(200).json(scenario);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },

  // replaceScenario: async (req, res, next) => {
  //   try {
  //     const scenarioId = req.params.id;
  //     const newScenario = req.body;
  //     const result = await Scenario.findByIdAndUpdate(scenarioId, newScenario);
  //     res.status(200).json({
  //       message: `${scenarioId} has been replaced`,
  //       newScenario: result,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // updateScenario: async (req, res, next) => {
  //   try {
  //     const scenarioId = req.params.id;
  //     const newScenario = req.body;
  //     const result = await Scenario.findByIdAndUpdate(scenarioId, newScenario);
  //     res.status(200).json({ message: `${scenarioId} has been updated` });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  getScenarioSteps: async (req, res, next) => {
    const scenarioId = req.params.id;
    try {
      const scenario = await Scenario.findByPk(scenarioId);
      const testcase_steps = await scenario.getTestcase_steps();
      res.status(200).json(testcase_steps);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },
};
