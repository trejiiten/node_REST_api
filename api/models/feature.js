const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const featureSchema = Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   feature_file_title: String,
//   feature_file_type: String,
//   feature_file_location: String,
//   scenarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scenario" }],
//   total_tests: Number,
//   total_steps: Number,
//   time_start: { type: Date, default: Date.now },
//   time_end: { type: Date, required: true },
//   total_time: Number,
// });


const stepSchema = new Schema({
  testcase_step_title: String,
  testcase_step_status: String,
  error_message: {type: String, required: false },
});

const scenarioSchema = new Schema({
  testcase_title: String,
  testcase_steps: [{
    type: Schema.Types.ObjectId,
    ref: 'stepSchema'
 }]
});

const featureSchema = Schema({
  feature_file_title: String,
  feature_file_type: String,
  feature_file_location: String,
  scenarios: [{
    type: Schema.Types.ObjectId,
    ref: 'scenarioSchema'
 }],
  total_tests: Number,
  total_steps: Number,
  time_start: { type: Date, default: Date.now },
  time_end: Date,
  total_time: Number,
});


module.exports = mongoose.model("Feature", featureSchema);


