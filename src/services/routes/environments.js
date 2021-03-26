const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const EnvironmentsController = require("../controllers/environments");
const authorization = require("../middleware/check_authorization");


/**
 * The route "/" GET gets all environments from the database. This also includes their features, scenarios, and steps
 * The route "/" POST also incorporates jsonwebtoken authentication middleware. If the user posting data does not have a token,
 * they will receive a 500 error.
 * 
 * Routes currently not being utilized.
 * The route "/:id" GET will get a single environment in the database by its id.
 * The route "/:id" PATCH will update a single environment in the database by its id.
 * The route "/:id/features" GET was originally created to get all features for a specific environment. Its purpose was for readability only.
 */
router
  .get("/", EnvironmentsController.index)
  .post("/",authorization.tokenAuthentication, EnvironmentsController.newEnvironment);

router
  .route("/:id")
  .get(EnvironmentsController.getEnvironment)
  .patch(EnvironmentsController.updateEnvironment);

router
  .route("/:id/features")
  .get(EnvironmentsController.getEnvironmentFeatures);
  // .post(EnvironmentsController.newEnvironmentFeature);

module.exports = router;
