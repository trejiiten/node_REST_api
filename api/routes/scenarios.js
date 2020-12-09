const express = require('express')
const router = express.Router()

const Scenario = require('../models/scenario')
const mongoose = require('mongoose')

router.get('/', (req, res, next) => {
  Scenario.find()
    .exec()
    .then((docs) => {
      console.log(docs)
      res.status(200).json(docs)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.post('/', (req, res, next) => {
  const scenario = new Scenario({
    _id: new mongoose.Types.ObjectId(),
    testcase_title: req.body.testcase_title,
    testcase_stepId: req.body.testcase_stepId,
  })
  scenario
    .save()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'Handling POST request to /scenarios',
        createdFeature: result,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.get('/:scenarioId', (req, res, next) => {
  const id = req.params.scenarioId
  Scenario.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc)
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({
          message: `No valid entry exists with the ID: ${id}`,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.patch('/:scenarioId', (req, res, next) => {
  const id = req.params.scenarioId
  const updateOperations = {}
  for (const ops of req.body) {
    updateOperations[ops.propName] = ops.value
  }
  Scenario.update({ _id: id }, { $set: updateOperations })
    .exec()
    .then((result) => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch((er) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

module.exports = router
