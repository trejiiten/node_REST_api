// MongoDB server
// const http = require("http");
// const app = require("./app");

// const port = process.env.PORT || 3000;

// const server = http.createServer(app);

// server.listen(port);



// Squelize Server
const { sequelize } = require("./models");
const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(PORT, async ()=>{
        console.log(`listening on: http://localhost:${PORT}`)
        // await sequelize.authenticate();
        await sequelize.sync({force: true});
        console.log('Database connected!')
});