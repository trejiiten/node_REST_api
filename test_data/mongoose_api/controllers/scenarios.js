const Scenario = require("../models/scenario");
const Step = require("../models/step");

module.exports = {
  index: async (req, res, next) => {
    try {
      const scenarios = await Scenario.find({});
      res.status(200).json(scenarios);
    } catch (err) {
      next(err);
    }
  },

  newScenario: async (req, res, next) => {
    try {
      const newScenario = new Scenario(req.body);
      const scenario = await newScenario.save();
      res.status(201).json(scenario);
    } catch (err) {
      next(err);
    }
  },

  getScenario: async (req, res, next) => {
    try {
      const { scenarioId } = req.params;
      const scenario = await Scenario.findById(scenarioId);
      res.status(200).json(scenario);
    } catch (err) {
      next(err);
    }
  },

  replaceScenario: async (req, res, next) => {
    try {
      const { scenarioId } = req.params;
      const newScenario = req.body;
      const result = await Scenario.findByIdAndUpdate(scenarioId, newScenario);
      res.status(200).json({
        message: `${scenarioId} has been replaced`,
        newScenario: result,
      });
    } catch (err) {
      next(err);
    }
  },

  updateScenario: async (req, res, next) => {
    try {
      const { scenarioId } = req.params;
      const newScenario = req.body;
      const result = await Scenario.findByIdAndUpdate(scenarioId, newScenario);
      res.status(200).json({ message: `${scenarioId} has been updated` });
    } catch (err) {
      next(err);
    }
  },
  getScenarioSteps: async (req, res, next) => {
    try {
      const { scenarioId } = req.params;
      const scenario = await Scenario.findById(scenarioId).populate(
        "testcase_steps"
      );
      res.status(200).json(scenario.testcase_steps);
    } catch (err) {
      next(err);
    }
  },
  newScenarioStep: async (req, res, next) => {
    try {
      const { scenarioId } = req.params;
      const newStep = new Step(req.body);
      const scenario = await Scenario.findById(scenarioId);
      newStep.scenario = scenario;
      await newStep.save();
      scenario.testcase_steps.push(newStep);
      await scenario.save();
      res.status(201).json(newStep);
    } catch (err) {
      next(err);
    }
  },
};
