const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Feature titles fetched'
    });
});

router.post('/',(req, res, next)=>{
    res.status(201).json({
        message: 'Feature titles added'
    });
});

router.get('/:featureId',(req, res, next)=>{
    res.status(200).json({
        message: `Feature title ${req.params.featureId} fetched`,
        featureId: req.params.featureId
    });
});

router.patch('/:featureId',(req, res, next)=>{
    res.status(200).json({
        message: `Feature title ${req.params.featureId} updated`
    });
});

module.exports = router;