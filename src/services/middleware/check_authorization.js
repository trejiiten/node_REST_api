require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * Method will take a request (a valid user's access token) and verify that it is similar to the access secret.
   * @param {*} req - User's access token (bearer token)
   * @param {*} res - Server response
   * @param {*} next - tells server a new action is able to be performed.
   */
  tokenAuthentication: (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(bearerToken, process.env.ACCESS_SECRET);
      req.userData = decoded;
      next();
    } catch (error) {
      res
        .status(500)
        .json({
          message:
            "You must provide an access token. \n If no token was provided, you must login and obtain your access token.",
        });
    }
  },
};
