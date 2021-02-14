const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const EnvironmentsController = require("../controllers/environments");
const authorization = require("../middleware/check_authorization");


router
  // .route("/")
  .get("/", EnvironmentsController.index)
  .post("/",authorization.tokenAuthentication, EnvironmentsController.newEnvironment);

router
  .route("/:environmentId")
  .get(EnvironmentsController.getEnvironment)
  .patch(EnvironmentsController.updateEnvironment);

router
  .route("/:environmentId/features")
  .get(EnvironmentsController.getEnvironmentFeatures);
  // .post(EnvironmentsController.newEnvironmentFeature);

module.exports = router;
