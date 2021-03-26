const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const StepsController = require("../controllers/steps");

/**
 * Routes currently not being utilized.
 * The route "/" will get all steps in the database
 * The route "/:id" will get a single step in the database by its id.
 */
router
    .route("/")
        .get(StepsController.index);
        
router.route("/:id").get(StepsController.getStep);

module.exports = router;
