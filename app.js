require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const environmentRoutes = require("./api/routes/environments");
const featureRoutes = require("./api/routes/features");
const scenarioRoutes = require("./api/routes/scenarios");
const stepRoutes = require("./api/routes/steps");

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_NAME}.5nxwt.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

mongoose.promise = global.promise;

// Logging
app.use(morgan("dev"));
// Parse json req
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
  //TODO: change '*' to specific ip-domain
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes that handle HTTP requests
app.use("/environments", environmentRoutes);
app.use("/features", featureRoutes);
app.use("/scenarios", scenarioRoutes);
app.use("/steps", stepRoutes);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
