const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const FeaturesController = require("../controllers/features");

router.route("/").get(FeaturesController.index);

router.route("/:id").get(FeaturesController.getFeature);

router
  .route("/:id/scenarios")
  .get(FeaturesController.getFeatureScenarios);

module.exports = router;
