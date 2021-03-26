const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const FeaturesController = require("../controllers/features");
/**
 * Routes currently not being utilized.
 * The route "/" will get all features in the database
 * The route "/:id" will get a single feature in the database by its id.
 * The route "/:id/scenarios" was originally created to get all scenarios for a specific feature. It's purpose was for readability only.
 */
router.route("/").get(FeaturesController.index);

router.route("/:id").get(FeaturesController.getFeature);

router
  .route("/:id/scenarios")
  .get(FeaturesController.getFeatureScenarios);

module.exports = router;
