const mongoose = require('mongoose');

const environmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    featureId: {type: String, required: true },
    os_name: {type: String, required: true },
    os_version: {type: String, required: true },
    branch: {type: String, required: true },
    platform_architecture: {type: String, required: true },
    user: {type: String, required: true },
    host: {type: String, required: true },
    address: {type: String, required: true },
    environment: {type: String, required: true },
    browser_name: {type: String, required: true },
    browser_version: {type: String, required: true },
    headless_mode: {type: String, required: true },
    awsdev: {type: String, required: false },
    java_version: {type: String, required: true },
    jvm_version: {type: String, required: true },
    jvm_vendor: {type: String, required: true },
    webdriver_version: {type: String, required: true },
});

module.exports = mongoose.model('Environment', environmentSchema);