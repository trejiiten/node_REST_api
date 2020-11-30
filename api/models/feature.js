const mongoose = require('mongoose');

const featureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    feature_file_title: String,
    feature_file_type: String,
    feature_file_location: String,
    scenarioId: String,
    total_tests: Number,
    total_steps: Number,
    time_start: Date,
    time_end: Date,
    total_time: Number
});

module.exports = mongoose.model('Feature', featureSchema);