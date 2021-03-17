const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scenarioSchema = new Schema({
  feature_file: { type: Schema.Types.ObjectId, ref: "Feature" },
  testcase_title: String,
  testcase_steps: [{ type: Schema.Types.ObjectId, ref: "Step" }],
  total_steps: Number,
  time_start: { type: Date, default: Date.now },
  time_end: { type: Date },
});

const Scenario = mongoose.model("Scenario", scenarioSchema);
module.exports = Scenario;
