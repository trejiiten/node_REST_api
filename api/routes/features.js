const express = require('express');
const router = express.Router();

const Feature = require('../models/feature');
const mongoose = require('mongoose');

router.get('/',(req, res, next)=>{
    Feature.find().exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/',(req, res, next)=>{
    const feature = new Feature({
        _id: mongoose.Types.ObjectId(),
        feature_file_title: req.body.feature_file_title,
    feature_file_type: req.body.feature_file_type,
    feature_file_location: req.body.feature_file_location,
    scenarioId: req.body.senarioId,
    total_tests: req.body.total_tests,
    total_steps: req.body.total_steps,
    time_start: req.body.time_start,
    time_end: req.body.time_end,
    total_time: req.body.total_time

    });
    feature.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Feature titles added',
            createdFeature: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
});

router.get('/:featureId',(req, res, next)=>{
    
    const id = req.params.featureId;
    Feature.findById(id).exec().then(doc=>{
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: `No valid entry exists with the ID: ${id}`
            });
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });    
});
});

router.patch('/:featureId',(req, res, next)=>{
    res.status(200).json({
        message: `Feature title ${req.params.featureId} updated`
    });
});

module.exports = router;