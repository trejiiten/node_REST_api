const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /environments'
    });
});

router.post('/', (req, res, next)=>{
    const environment = {
        featureId: req.body.featureId,
    os_name: req.body.os_name,
    os_version: req.body.os_version,
    branch: req.body.branch,
    platform_architecture: req.body.platform_architecture,
    user: req.body.user,
    host: req.body.host,
    address: req.body.address,
    environment: req.body.environment,
    browser_name: req.body.browser_name,
    browser_version: req.body.browser_version,
    headless_mode: req.body.headless_mode,
    awsdev: req.body.awsdev,
    java_version: req.body.java_version,
    jvm_version: req.body.jvm_version,
    jvm_vendor: req.body.jvm_vendor,
    webdriver_version: req.body.webdriver_version
    };
    res.status(201).json({
        message: 'Handling POST requests to /environments',
        createdEnvironment: environment
    });

});

router.get('/:environmentId', (req, res, next)=>{
    const id = req.params.environmentId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You have entered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: `You have entered the id: ${id}`
        });
    }
});

router.patch('/:environmentId', (req, res, next)=>{
    const id = req.params.environmentId;
    res.status(200).json({
        message: `You have UPDATED the id: ${id}`
    });
});

module.exports = router;