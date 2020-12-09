const mongoose = require('mongoose')

const stepSchema = mongoose.Schema({
  scenario: { type: mongoose.Schema.Types.ObjectId, ref: 'Scenario' },
  testcase_step_title: { type: String, required: true },
  testcase_step_status: { type: String, required: true },
  error_message: { type: String, required: false },
})

module.exports = mongoose.model('Step', stepSchema)
