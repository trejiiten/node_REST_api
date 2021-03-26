const express = require("express");
// const router = express.Router()
const router = require("express-promise-router")();
const UsersController = require("../controllers/users");

/**
 * The "/" POST route is for creating a new user in the database. 
 * The "/" GET route is for getting a list of users in the database.
 * The "/:userInput" GET route is for obtaining a single user from the database.
 * The "/:userInput" DELETE route is for deleting a user from the database.
 * The "/login" POST route is required for a user that exists when obtaining an access token.
 */
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