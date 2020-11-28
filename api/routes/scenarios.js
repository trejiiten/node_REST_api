const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Scenarios fetched'
    });
});

router.post('/',(req, res, next)=>{
    res.status(201).json({
        message: 'Scenarios added'
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