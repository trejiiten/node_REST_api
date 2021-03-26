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
  /**
   * Gets a list of all Environments currently in the db along with their associated Features, Scenarios, and Steps
   * 
   * @param {*} req - The json object that will be parsed and persisted by the ORM
   * @param {*} res - The server's response
   * @param {*} next - Handles any errors that may occur 
   */
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
  /**
   * Primary method called when sending data from QAA Framework to persist to the database.
   * This method performs the following: <br>
   * <ul>
   * <li>Adds an environment</li>
   * <li>For Every feature run by environment, create a new feature</li>
   * <li>If feature already exists, add Scenarios/Steps to the feature</li>
   * <li>If no new features, only Steps will be added to the db</li>
   * </ul><br>
   * 
   * @param {*} req - The json object that will be parsed and persisted by the ORM
   * @param {*} res - The server's response
   * @param {*} next - Handles any errors that may occur
   */
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
    let currEnvironment = null;
    try {
      currEnvironment = await Environment.findOne(environmentAndNestedData);
    } catch (err) {
      next(err);
      res.status(500).send();
    }
      if (currEnvironment == null) {
        let newEnvironment = null;
        try {
          newEnvironment = await Environment.create(body);
        } catch (error) {
          next(error);
          res.status(500).send();
        }
        try {
          await createNewFeatureOrAddNewStepsToExistingFeature(
            bodyFeatures,
            next,
            newEnvironment
          );
        } catch (error) {
          next(error);
          res.status(500).send();
        }
        
      } else {
        try {
          await createNewFeatureOrAddNewStepsToExistingFeature(
            bodyFeatures,
            next,
            currEnvironment
          );
        } catch (error) {
          next(error);
          res.status(500).send();
        }
        
        await Environment.update(body, {
          where: { address: body.address, environment: body.environment },
        });
      }
      result = await Environment.findOne(environmentAndNestedData);

      res.status(200).json(result);
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

/**
 * Method creates a new feature if it does not exist, or calls addStepsToCurrentFeature for adding new Scenarios and/or Steps to the database
 * @param {*} bodyFeatures - a single feature from the list of feature objects in the req.body
 * @param {*} next 
 * @param {*} environment - The environment that was POSTed (can be new or existing)
 */
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
    } else {
      const dbFeatureTotalTestCount = currFeature.total_tests;
      await addStepsToCurrentFeature(feature, currFeature, dbFeatureTotalTestCount, next);
      let environmentFeatures = await environment.getFeatures({
        where: { id: currFeature.id },
      });
      if (environmentFeatures.length < 1) {
        await environment.addFeature(currFeature);
      }
    }
  }
}

/**
 * If Scenario does not exist: method adds Scenarios and their Steps.
 * If Scenario exists: method adds new Steps to existing scenarios.
 * 
 * @param {*} feature - The feature that is part of the req.body
 * @param {*} currFeature - The current feature in the database
 * @param {*} dbFeatureTotalTestCount - Count of how many total_tests there are for current feature in the database.
 * @param {*} next 
 */
async function addStepsToCurrentFeature(feature, currFeature, dbFeatureTotalTestCount, next) {
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
        }
      }
      await Scenario.update(scenarioData, {
        where: { testcase_title: scenarioData.testcase_title },
        returning: true,
      });
    } else {
      await currFeature.createScenario(scenarioData, {
        include: [{ model: Step, as: "testcase_steps" }],
      });
    }
  }
  const updatedFeature = await Feature.findOne({where:{ feature_file_title: feature.feature_file_title }, include:[{ model: Scenario, as: "scenarios" }],});
  let dbFeatureScenarioCount = updatedFeature.scenarios.length;
  if(dbFeatureTotalTestCount != dbFeatureScenarioCount){
    await Feature.update({total_tests: dbFeatureScenarioCount}, {
      where: { feature_file_title: feature.feature_file_title },
      returning: true,
    });
  } 
  let fieldsToExclude = ['total_tests','total_steps'];
  const excludedFieldsFeature = Object.keys(Feature.rawAttributes).filter(s => !fieldsToExclude.includes(s));
  await Feature.update(feature, {
    where: { feature_file_title: feature.feature_file_title },
    fields: excludedFieldsFeature,
    returning: true,
  });
  // if (dbFeatureScenarioCount > newScenarioCount){
  // } else {
  //   await Feature.update(feature, {
  //     where: { feature_file_title: feature.feature_file_title },
  //     returning: true,
  //   });
    
  // }
}
