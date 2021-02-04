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
      const environments = await Environment.findAll({ include: [Feature] });
      res.status(201).json(environments);
    } catch (err) {
      next(err);
    }
  },
  newEnvironment: async (req, res, next) => {
    const body = req.body;
    const environmentAddress = { where: { address: body.address, environment: body.environment } };
    let result = null;
    const bodyFeatures = body.features;
    try {
      let currEnvironment = await Environment.findOne(environmentAddress,{include:[{model:Feature, as:"features", include:[{model:Scenario, as:"scenarios", include:[{model:Step, as:"testcase_steps"}]}]}]});
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
        featuresPresent = await Feature.findAll();
        for await (const f of body.features){
          await currEnvironment.addFeature(f,{as:"features"});

        }
        console.log(currEnvironment);
        await Environment.update({
          where: { address: body.address },
        });
      }
      result = await Environment.findOne(environmentAddress, {
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
      let newFeature = await createNewFeature(feature, next);
      await environment.addFeature(newFeature, { as: "features" });
    } else {
      await addStepsToCurrentFeature(feature, currFeature, next);
    }
  }
}

async function addStepsToCurrentFeature(feature, currFeature, next) {
  const featureScenarios = await currFeature.getScenarios({include:[{model:Step, as:"testcase_steps"}]});
  for await (const featureScenario of featureScenarios) {
    const isScenarioPresent = await currFeature.hasScenario(featureScenario);
    if (isScenarioPresent) {
        const featureScenarioData = feature.scenarios;
        for await (const scenarioData of featureScenarioData){
          if(scenarioData.testcase_title === featureScenario.testcase_title){

            const data = scenarioData.testcase_steps;
            for await (const d of data){
              try {
                await featureScenario.createTestcase_step(d);
              } catch (error) {
                next(error)
              }
            }
          } else {
            break;
          }
        }
        // const newFeatureScenario = await featureScenario.getTestcase_steps();
        // console.log(newFeatureScenario);
    } else {
      const newScenario = await currFeature.createScenario(scenario, {
        include: [{ model: Step, as: "testcase_steps" }],
      });
    }
  }
}

async function createNewFeature(feature, next) {
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
}
// let scenarios = await Promise.all(
//   feature.scenarios.map(async (scenario) => {
//     const currScenario = await Scenario.findOne({
//       where: { testcase_title: scenario.testcase_title },
//       include: [Step],
//     });

//     if (currScenario == null) {
//       const newSenario = await Scenario.create(
//         { scenario },
//         { include: [Step] },
//         {include:Feature}
//       );
//       newScenario.addSteps(steps);
//       console.log(newScenario);
//     } else {
//       let steps = await Promise.all(
//         scenario.testcase_steps.map(async (step) => {
//           const newStep = await Step.create(
//             { step },
//             { include: Scenario }
//           );
//           console.log(newStep);
//         })
//       );
//       currScenario.addSteps(steps);
//       console.log(currScenario.testcase_title);
//     }
//   })
// );
