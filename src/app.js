const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const compression = require('compression');
const helmet = require("helmet");

const environmentRoutes = require("./services/routes/environments");
const featureRoutes = require("./services/routes/features");
const scenarioRoutes = require("./services/routes/scenarios");
const stepRoutes = require("./services/routes/steps");
const userRoutes = require("./services/routes/users");

// Logging
const fullLogStream = fs.createWriteStream(
  path.join(__dirname, "./utils/logs/fullLog.log"),
  { flags: "a" }
);
const errorFailureLogStream = fs.createWriteStream(
  path.join(__dirname, "./utils/logs/errorLog.log"),
  { flags: "a" }
);
const nonFailureLogStream = fs.createWriteStream(
  path.join(__dirname, "./utils/logs/nonFailureLog.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: fullLogStream }));
app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: errorFailureLogStream,
  })
);
app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode > 400;
    },
    stream: nonFailureLogStream,
  })
);

// HTTP Compression
app.use(compression());

// Protection against common vulnerabilities
app.use(helmet());

// Parse json req
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json({ limit: "50mb" }));

// CORS headers
app.use((req, res, next) => {
  //TODO: change '*' to specific ip-domain
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Reset last-modified to correct for 304 responses due to caching
app.get('/*', function(req, res, next){ 
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next(); 
});
// Routes that handle HTTP requests
app.use("/environments", environmentRoutes);
app.use("/features", featureRoutes);
app.use("/scenarios", scenarioRoutes);
app.use("/steps", stepRoutes);
app.use("/users", userRoutes);

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
