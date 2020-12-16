const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stepSchema = Schema({
  scenario: { type: Schema.Types.ObjectId, ref: 'Scenario' },
  testcase_step_title: String,
  testcase_step_status: String,
  error_message: { type: String, required: false },
})

const Step = mongoose.model('Step', stepSchema)
module.exports = Step
