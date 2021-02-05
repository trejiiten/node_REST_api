const {
  sequelize,
  defaults,
  Environment,
  Feature,
  Scenario,
  Step,
  Environment_Feature,
} = require("../models");
const feature = require("../models/feature");
const scenario = require("../models/scenario");

module.exports = {
  index: async (req, res, next) => {
    try {
      const environments = await Environment.findAll({where: { address: body.address, environment: body.environment },
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
        ],});
      res.status(201).json(environments);
    } catch (err) {
      next(err);
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
        // const featuresPresent = await Feature.findAll({
        //   include: [
        //     {
        //       model: Scenario,
        //       as: "scenarios",
        //       include: [{ model: Step, as: "testcase_steps" }],
        //     },
        //   ],
        // });
        // let example = await currEnvironment.setFeature(featuresPresent);
        // console.log(example);
      }
      result = await Environment.findOne(environmentAndNestedData);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  getEnvironment: async (req, res, next) => {
    try {
      const { environmentId } = req.params;
      const environment = await Environment.findByPk({
        where: { id: environmentId },
      });
      res.status(200).json(environment);
    } catch (err) {
      next(err);
    }
  },
  updateEnvironment: async (req, res, next) => {
    try {
      const { environmentId } = req.params;
      const newEnvironment = req.body;
      const result = await Environment.update(
        { newEnvironment },
        { where: { id: environmentId } }
      );
      res.status(200).json({ message: `${environmentId} has been updated` });
    } catch (err) {
      next(err);
    }
  },
  getEnvironmentFeatures: async (req, res, next) => {
    try {
      const { environmentId } = req.params;
      const environment = await Environment.findOne({
        where: { id: environmentId },
      });
      const features = await environment.getFeatures();
      res.status(200).json(features);
    } catch (err) {
      next(err);
    }
  },
  newEnvironmentFeature: async (req, res, next) => {
    try {
      const { environmentId } = req.params;
      const newFeature = Feature.create(req.body);
      const environment = await Environment.findByPk({
        where: { id: environmentId },
      });
      await environment.addFeature(newFeature);
      res.status(201).json(newFeature);
    } catch (err) {
      next(err);
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
      }
      await environment.addFeature(newFeature);
      let example = await environment.getFeatures();
      console.log(example);
    } else {
      await addStepsToCurrentFeature(feature, currFeature, next);
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
      if (featScen.testcase_title === scenarioData.testcase_title){
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
        }
      }
    } else {
      const newScenario = await currFeature.createScenario(scenario, {
        include: [{ model: Step, as: "testcase_steps" }],
      });
    }
  }
}

