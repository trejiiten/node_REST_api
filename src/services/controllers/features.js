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
      const features = await Feature.findAll({
        include: [
          {
            model: Scenario,
            as: "scenarios",
            include: [{ model: Step, as: "testcase_steps" }],
          },
        ],
      });
      features.length == 0
        ? res.status(404).json({
            api_notification: { message: "There were no records found" },
          })
        : res.status(200).json(features);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },

  getFeature: async (req, res, next) => {
    const featureId = req.params.id;
    try {
      const feature = await Feature.findByPk(featureId);
      res.status(200).json(feature);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },

  // replaceFeature: async (req, res, next) => {
  //   try {
  //     const featureId = req.params.id;
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
  //     const featureId = req.params.id;
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
    const featureId = req.params.id;
    try {
      const feature = await Feature.findByPk(featureId);
      const scenarios = await feature.getScenarios({
        include: [{ model: Step, as: "testcase_steps" }],
      });
      res.status(200).json(scenarios);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },
};
