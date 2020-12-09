const express = require('express')
const router = express.Router()

const Environment = require('../models/environment')
const mongoose = require('mongoose')

router.get('/', (req, res, next) => {
  Environment.find()
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
  const environment = new Environment({
    _id: new mongoose.Types.ObjectId(),
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
    webdriver_version: req.body.webdriver_version,
  })
  environment
    .save()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'Handling POST request to /environments',
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

router.get('/:environmentId', (req, res, next) => {
  const id = req.params.environmentId
  Environment.findById(id)
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

router.patch('/:environmentId', (req, res, next) => {
  const id = req.params.environmentId
  const updateOperations = {}
  for (const ops of req.body) {
    updateOperations[ops.propName] = ops.value
  }
  Environment.update({ _id: id }, { $set: updateOperations })
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
