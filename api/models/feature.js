const mongoose = require('mongoose')

const featureSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  feature_file_title: { type: String, required: true },
  feature_file_type: { type: String, required: true },
  feature_file_location: { type: String, required: true },
  scenarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scenario' }],
  total_tests: { type: Number, required: true },
  total_steps: { type: Number, required: true },
  time_start: { type: Date, default: Date.now },
  time_end: { type: Date, required: true },
  total_time: { type: Number, required: true },
})

module.exports = mongoose.model('Feature', featureSchema)
