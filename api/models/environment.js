const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const environmentSchema = mongoose.Schema({
  featureId: String,
  os_name: String,
  os_version: String,
  branch: String,
  platform_architecture: String,
  user: String,
  host: String,
  address: String,
  environment: String,
  browser_name: String,
  browser_version: String,
  headless_mode: String,
  awsdev: { type: String, required: false },
  java_version: String,
  jvm_version: String,
  jvm_vendor: String,
  webdriver_version: String,
  features: [{ type: Schema.Types.ObjectId, ref: "Feature" }],
});

const Environment = mongoose.model("Environment", environmentSchema);
module.exports = Environment;
