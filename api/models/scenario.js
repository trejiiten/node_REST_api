const mongoose = require("mongoose");

const scenarioSchema = mongoose.Schema({
  feature: { type: mongoose.Schema.Types.ObjectId, ref: "Feature" },
  testcase_title: { type: String, required: true },
  testcase_steps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Step" }],
});

module.exports = mongoose.model("Scenario", scenarioSchema);
