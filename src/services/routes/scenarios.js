const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const ScenariosController = require("../controllers/scenarios");

router.route("/").get(ScenariosController.index);

router.route("/:id").get(ScenariosController.getScenario);

router.route("/:id/steps").get(ScenariosController.getScenarioSteps);

module.exports = router;
