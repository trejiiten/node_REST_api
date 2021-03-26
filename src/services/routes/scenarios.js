const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const ScenariosController = require("../controllers/scenarios");

/**
 * Routes currently not being utilized.
 * The route "/" will get all scenarios in the database
 * The route "/:id" will get a single scenario in the database by its id.
 * The route "/:id/steps" was originally created to get all steps for a specific scenario. It's purpose was for readability only.
 */
router.route("/").get(ScenariosController.index);

router.route("/:id").get(ScenariosController.getScenario);

router.route("/:id/steps").get(ScenariosController.getScenarioSteps);

module.exports = router;
