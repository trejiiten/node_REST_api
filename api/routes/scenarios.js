const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const ScenariosController = require("../controllers/scenarios");

router
  .route("/")
  .get(ScenariosController.index)
  .post(ScenariosController.newScenario);

router
  .route("/:scenarioId")
  .get(ScenariosController.getScenario)
  .put(ScenariosController.replaceScenario)
  .patch(ScenariosController.updateScenario);

router
  .route("/:scenarioId/steps")
  .get(ScenariosController.getScenarioSteps)
  .post(ScenariosController.newScenarioStep);

module.exports = router;
