const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Steps fetched'
    });
});

router.post('/',(req, res, next)=>{
    const step = {
        testcase_step_title: req.body.testcase_step_title,
        testcase_step_status: req.body.testcase_step_status,
        error_message: req.body.error_message
    };
    res.status(201).json({
        message: 'Steps added',
        createdStep: step
    });
});

router.get('/:stepId',(req, res, next)=>{
    res.status(200).json({
        message: `Step ${req.params.stepId} fetched`,
        stepId: req.params.stepId
    });
});

router.patch('/:stepId',(req, res, next)=>{
    res.status(200).json({
        message: `Step ${req.params.stepId} updated`
    });
});

module.exports = router;