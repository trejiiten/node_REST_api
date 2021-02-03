const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const EnvironmentsController = require("../controllers/environments");

router
  .route("/")
  .get(EnvironmentsController.index)
  .post(EnvironmentsController.newEnvironment);

router
  .route("/:environmentId")
  .get(EnvironmentsController.getEnvironment)
  .patch(EnvironmentsController.updateEnvironment);

router
  .route("/:environmentId/features")
  .get(EnvironmentsController.getEnvironmentFeatures)
  .post(EnvironmentsController.newEnvironmentFeature);

module.exports = router;
