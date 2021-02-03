const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const FeaturesController = require("../controllers/features");

router
  .route("/")
  .get(FeaturesController.index)
  .post(FeaturesController.newFeature);

router
  .route("/:featureId")
  .get(FeaturesController.getFeature)
  .put(FeaturesController.replaceFeature)
  .patch(FeaturesController.updateFeature);

router
  .route("/:featureId/scenarios")
  .get(FeaturesController.getFeatureScenarios)
  .post(FeaturesController.newFeatureScenario);

module.exports = router;
