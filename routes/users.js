const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();
const UsersController = require("../controllers/users");

router
  .route("/")
  .get(UsersController.index)
  .post(UsersController.newUser);

router
  .route("/:userInput")
  .get(UsersController.getUser)
  .delete(UsersController.deleteUser);

  router.route("/login").post(UsersController.userLogin);
module.exports = router;