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
      const environments = await Environment.findAll({
        include: [
          {
            model: Feature,
            as: "features",
            include: [
              {
                model: Scenario,
                as: "scenarios",
                include: [{ model: Step, as: "testcase_steps" }],
              },
            ],
          },
        ],
      });
      environments.length == 0
        ? res.status(404).json({
            api_notification: { message: "There were no records found" },
          })
        : res.status(200).json(environments);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },
  newEnvironment: async (req, res, next) => {
    const body = req.body;
    const environmentAndNestedData = {
      where: { address: body.address, environment: body.environment },
      include: [
        {
          model: Feature,
          as: "features",
          include: [
            {
              model: Scenario,
              as: "scenarios",
              include: [{ model: Step, as: "testcase_steps" }],
            },
          ],
        },
      ],
    };
    let result = null;
    const bodyFeatures = body.features;
    try {
      let currEnvironment = await Environment.findOne(environmentAndNestedData);
      if (currEnvironment == null) {
        let newEnvironment = null;
        try {
          newEnvironment = await Environment.create(body);
        } catch (error) {
          next(error);
          res.status(500).send();
        }
        await createNewFeatureOrAddNewStepsToExistingFeature(
          bodyFeatures,
          next,
          newEnvironment
        );
      } else {
        await createNewFeatureOrAddNewStepsToExistingFeature(
          bodyFeatures,
          next,
          currEnvironment
        );
        await Environment.update(body, {
          where: { address: body.address, environment: body.environment },
        });
        const updated = await Environment.findOne({
          where: {
            address: currEnvironment.address,
            environment: currEnvironment.environment,
          },
        });
      }
      result = await Environment.findOne(environmentAndNestedData);

      res.status(200).json(result);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },
  getEnvironment: async (req, res, next) => {
    const environmentId = req.params.environmentId;
    try {
      const environment = await Environment.findByPk(environmentId);
      res.status(200).json(environment);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },
  updateEnvironment: async (req, res, next) => {
    const environmentId = req.params.id;
    try {
      const newEnvironment = req.body;
      const result = await Environment.update(
        { newEnvironment },
        { where: { id: environmentId } }
      );
      res.status(200).json({ message: `${environmentId} has been updated` });
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },
  getEnvironmentFeatures: async (req, res, next) => {
    const environmentId = req.params.id;
    try {
      const environment = await Environment.findByPk(environmentId);
      const features = await environment.getFeatures();
      res.status(200).json(features);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },
  newEnvironmentFeature: async (req, res, next) => {
    const environmentId = req.params.id;
    try {
      const newFeature = Feature.create(req.body);
      const environment = await Environment.findByPk(environmentId);
      await environment.addFeature(newFeature);
      res.status(201).json(newFeature);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
  },
};

async function createNewFeatureOrAddNewStepsToExistingFeature(
  bodyFeatures,
  next,
  environment
) {
  for await (const feature of bodyFeatures) {
    const currFeature = await Feature.findOne({
      where: { feature_file_title: feature.feature_file_title },
      include: [
        {
          model: Scenario,
          as: "scenarios",
          include: [{ model: Step, as: "testcase_steps" }],
        },
      ],
    });
    if (!currFeature) {
      let newFeature = null;
      try {
        newFeature = await Feature.create(feature, {
          include: [
            {
              model: Scenario,
              as: "scenarios",
              include: [{ model: Step, as: "testcase_steps" }],
            },
          ],
        });
      } catch (error) {
        next(error);
        res.status(500).send();
      }
      await environment.addFeature(newFeature);
    } else {
      await addStepsToCurrentFeature(feature, currFeature, next);
      let environmentFeatures = await environment.getFeatures({
        where: { id: currFeature.id },
      });
      if (environmentFeatures.length < 1) {
        await environment.addFeature(currFeature);
      }
    }
  }
}

async function addStepsToCurrentFeature(feature, currFeature, next) {
  const featureScenarios = await currFeature.getScenarios({
    include: [{ model: Step, as: "testcase_steps" }],
  });
  const featureScenarioData = feature.scenarios;
  for await (const scenarioData of featureScenarioData) {
    let featureScenario = featureScenarios.find((featScen) => {
      if (featScen.testcase_title === scenarioData.testcase_title) {
        return featScen;
      }
    });
    if (featureScenario) {
      const data = scenarioData.testcase_steps;
      for await (const d of data) {
        try {
          await featureScenario.createTestcase_step(d);
        } catch (error) {
          next(error);
          res.status(500).send();
        }
      }
      await Scenario.update(scenarioData, {
        where: { testcase_title: scenarioData.testcase_title },
        returning: true,
      });
      const updated = await Scenario.findOne({
        where: { testcase_title: scenarioData.testcase_title },
      });
    } else {
      await currFeature.createScenario(scenarioData, {
        include: [{ model: Step, as: "testcase_steps" }],
      });
    }
  }
  await Feature.update(feature, {
    where: { feature_file_title: feature.feature_file_title },
    returning: true,
  });
  const updated = await Feature.findOne({
    where: { feature_file_title: feature.feature_file_title },
  });
}
