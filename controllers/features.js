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
      const features = await Feature.findAll();
      res.status(201).json(features);
    } catch (err) {
      next(err);
    }
  },

  getFeature: async (req, res, next) => {
    try {
      const { featureId } = req.params;
      const feature = await Feature.findByPk(featureId);
      res.status(200).json(feature);
    } catch (err) {
      next(err);
    }
  },

  // replaceFeature: async (req, res, next) => {
  //   try {
  //     const { featureId } = req.params;
  //     const newFeature = req.body;
  //     const feature = await Feature.findByPk(featureId);
  //     res.status(200).json({
  //       message: `${featureId} has been replaced`,
  //       newFeature: result,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // updateFeature: async (req, res, next) => {
  //   try {
  //     const { featureId } = req.params;
  //     const newFeature = req.body;
  //     const feature = await Feature.findByPk(featureId);
  //     const result = await Feature.update(
  //       { newFeature },
  //       { where: { id: featureId } }
  //     );
  //     res.status(200).json({ message: `${featureId} has been updated` });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  getFeatureScenarios: async (req, res, next) => {
    try {
      const { featureId } = req.params;
      const feature = await Feature.findByPk(featureId);
      const scenarios = await feature.getScenarios({include:[{model:Step, as:"testcase_steps"}]});
      res.status(200).json(scenarios);
    } catch (err) {
      next(err);
    }
  },
};
