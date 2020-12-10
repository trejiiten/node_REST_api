const mongoose = require("mongoose");

const stepSchema = mongoose.Schema({
  scenario: { type: mongoose.Schema.Types.ObjectId, ref: "Scenario" },
  testcase_step_title: { type: String, required: true },
  testcase_step_status: { type: String, required: true },
  error_message: { type: String, required: false },
});

const scenarioSchema = mongoose.Schema({
  feature: { type: mongoose.Schema.Types.ObjectId, ref: "Feature" },
  testcase_title: { type: String, required: true },
  testcase_steps: [stepSchema],
});

const featureSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  feature_file_title: { type: String, required: true },
  feature_file_type: { type: String, required: true },
  feature_file_location: { type: String, required: true },
  scenarios: [scenarioSchema],
  total_tests: { type: Number, required: true },
  total_steps: { type: Number, required: true },
  time_start: { type: Date, default: Date.now },
  time_end: { type: Date, required: true },
  total_time: { type: Number, required: true },
});

module.exports = mongoose.model("Feature", featureSchema);
