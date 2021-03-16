const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();

const StepsController = require("../controllers/steps");

router
    .route("/")
        .get(StepsController.index);
        
router.route("/:id").get(StepsController.getStep);

module.exports = router;
