const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const featureSchema = new Schema({
  //   _id: mongoose.Schema.Types.ObjectId,
  feature_file_title: String,
  feature_file_type: String,
  feature_file_location: String,
  scenarios: [
    {
      type: Schema.Types.ObjectId,
      ref: "Scenario",
    },
  ],
  total_tests: Number,
  total_time: Number,
  environments:[{type: Schema.Types.ObjectId, ref:"Environment"}]
});

const Feature = mongoose.model("Feature", featureSchema);
module.exports = Feature;
