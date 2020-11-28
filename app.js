const express = require('express');
const app = express();

const environmentRoutes=require('./api/routes/environments');
const featureRoutes=require('./api/routes/features');
const scenarioRoutes=require('./api/routes/scenarios');

app.use('/environments', environmentRoutes);
app.use('/features', featureRoutes);
app.use('/scenarios', scenarioRoutes);

module.exports = app;