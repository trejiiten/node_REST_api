const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const ScenariosController = require("../controllers/scenarios");

router.route("/").get(ScenariosController.index);

router.route("/:scenarioId").get(ScenariosController.getScenario);

router.route("/:scenarioId/steps").get(ScenariosController.getScenarioSteps);

module.exports = router;
