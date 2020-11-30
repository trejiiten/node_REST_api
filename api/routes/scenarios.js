const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Scenarios fetched'
    });
});

router.post('/',(req, res, next)=>{
    const scenario = {
        testcase_title: req.body.testcase_title,
        testcase_stepId: req.body.testcase_stepId
    };
    res.status(201).json({
        message: 'Scenarios added',
        createdScenario: scenario
    });
});

router.get('/:scenarioId',(req, res, next)=>{
    res.status(200).json({
        message: `Scenario ${req.params.scenarioId} fetched`,
        scenarioId: req.params.scenarioId
    });
});

router.patch('/:scenarioId',(req, res, next)=>{
    res.status(200).json({
        message: `Scenario ${req.params.scenarioId} updated`
    });
});

module.exports = router;