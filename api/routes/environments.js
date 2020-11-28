const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /environments'
    });
});

router.post('/', (req, res, next)=>{
    res.status(201).json({
        message: 'Handling POST requests to /environments'
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