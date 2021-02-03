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
    const environmentAddress = { where: { address: body.address } };

    try {
      let currEnvironment = await Environment.findOne(environmentAddress);
      if (currEnvironment == null) {
        let newEnvironment = null;
        try {
          newEnvironment = await Environment.create(body);
        } catch (error) {
          next(error);
        }

        body.features.forEach(async (feature) => {
          const currFeature = await Feature.findOne({
            where: { feature_file_title: feature.feature_file_title },
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
            await newEnvironment.addFeature(newFeature, { as: "features" });
          } else {
     feature.scenarios.forEach(async (scenario) => {
              const currScenario = await Scenario.findOne({
                where: { testcase_title: scenario.testcase_title },
                include: [{ model: Step, as: "testcase_steps" }],
              });
              const stepData = scenario.testcase_steps;
              stepData.map(async (step) => {
                let newStep = null;
                try {
                  newStep = await Step.create(step);
                } catch (error) {
                  next(error);
                }

                try {
                  await currScenario.addTestcase_step(newStep);
                } catch (error) {
                  next(error);
                }
              });

              console.log(await currScenario.getTestcase_steps());
            });
          }
        });

        // await newEnvironment.addFeature(features);
        const result = await Environment.findOne(environmentAddress);
        console.log(result);
        res.status(200).json(result);
      } else {
        await currEnvironment.setFeatures([body.features]);
        console.log(currEnvironment);
        await Environment.update({
          where: { address: body.address },
        });
        console.log(currEnvironment);
        res.status(200).json(currEnvironment);
      }
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
