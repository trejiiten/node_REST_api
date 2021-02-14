require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
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
