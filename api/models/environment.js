const mongoose = require('mongoose')

const environmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
})

const Environment = mongoose.model('Environment', environmentSchema)
module.exports = Environment
