const { sequelize } = require("./models");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const environmentRoutes = require("./routes/environments");
const featureRoutes = require("./routes/features");
const scenarioRoutes = require("./routes/scenarios");
const stepRoutes = require("./routes/steps");
const userRoutes = require("./routes/users");

// Logging
app.use(morgan("dev"));
// Parse json req
app.use(express.urlencoded({ limit:'50mb', extended: false }));
app.use(express.json({limit:'50mb'}));

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

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(PORT, async ()=>{
  console.log(`listening on: http://localhost:${PORT}`)
  await sequelize.authenticate();
  // await sequelize.sync({force: true});
  await sequelize.sync();
  console.log('Database connected!')
});

 module.exports = app;