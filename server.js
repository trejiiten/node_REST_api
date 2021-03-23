require("dotenv").config();
const { sequelize } = require("./src/db/models");
const app = require("./src/app");

const PORT = process.env.PORT || 5000;
const URL = process.env.HOST;
const ENV = process.env.NODE_ENV;
app.listen(PORT, async () => {
  console.log(`listening on: ${URL}:${PORT}`);
  await sequelize.authenticate();
  ENV.toLowerCase() == 'test'.toLowerCase()
    ? await sequelize.sync({ force: true })
    : await sequelize.sync();
  console.log("Database connected!");
});
