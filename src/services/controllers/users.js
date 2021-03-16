require("dotenv").config();
const { sequelize, defaults, Op, User } = require("../../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: ["username", "createdAt"],
      });
      res.status(201).json(users);
    } catch (error) {
      next(error);
      res.status(500).send();
    }
  },
  newUser: async (req, res, next) => {
    const request = req.body;
    try {
      const hashedPass = await ecryptSecret(request.password);
      const [user, created] = await User.findOrCreate({
        where: { username: request.username },
        defaults: {
          username: request.username,
          password: hashedPass,
        },
      });
      if (created) {
        res.status(201).json({ message: "new user created" });
      } else {
        res
          .status(403)
          .json({ message: `The user ${request.username} already exists` });
      }
    } catch (error) {
      next(error);
      res.status(500).send();
    }
  },
  getUser: async (req, res, next) => {
    const userId = req.params.userInput;
    try {
      const user = await User.findByPk(userId);
      res.status(200).json({id:user.id, username: user.username, createdAt:user.createdAt});
    } catch (error) {
      next(error);
    }
    res.status(500).send();
  },
  deleteUser: async (req, res, next) => {
    const userInput = req.params.userInput;
    try {
      const userToDelete = await User.findOne({
        where: {
          username: userInput,
        },
      });
      if (!userToDelete) {
        return res.status(404).json({
          message: `The user with the following parameter ${userInput} does not exist`,
        });
      }
      await User.destroy({
        where: {
          username: userInput,
        },
      });
      const deleted = await User.findOne({
        where: {
          username: userInput,
        },
      });
      if (deleted === null) {
        const users = await User.findAll();
        res.status(200).json(users);
      } else {
        res.status(404).json({
          message: `The user with the following parameter ${userInput} was not deleted`,
        });
      }
    } catch (error) {
      next(error);
      res.status(500).send();
    }
  },
  userLogin: async (req, res, next) => {
    const request = req.body;
    try {
      const user = await User.findOne({
        where: { username: request.username },
      });
      if (user == null) {
        return res.status(500).json({
          message: `The user ${request.username} does not exist`,
        });
      }
      if (await bcrypt.compare(request.password, user.password)) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: "10m",
          }
        );
        return res.status(201).json({
          access_token: token,
        });
      } else {
        return res.status(404).json({
          message: "The user is not able to log in.",
        });
      }
    } catch (error) {
      next(error);
      res.status(500).send();
    }
  },
};

async function ecryptSecret(secret) {
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(secret, salt);
  return hashedPass;
}
