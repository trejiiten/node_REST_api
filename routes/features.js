const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const FeaturesController = require("../controllers/features");

router.route("/").get(FeaturesController.index);

router.route("/:featureId").get(FeaturesController.getFeature);

router
  .route("/:featureId/scenarios")
  .get(FeaturesController.getFeatureScenarios);

module.exports = router;
