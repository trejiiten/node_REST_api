const Feature = require('../models/feature')
const Scenario = require('../models/scenario')

module.exports = {
  index: async (req, res, next) => {
    try {
      const features = await Feature.find({})
      res.status(201).json(features)
    } catch (err) {
      next(err)
    }
  },

  newFeature: async (req, res, next) => {
    try {
      const newFeature = new Feature(req.body)
      const feature = await newFeature.save()
      res.status(201).json(feature)
    } catch (err) {
      next(err)
    }
  },

  getFeature: async (req, res, next) => {
    try {
      const { featureId } = req.params
      const feature = await Feature.findById(featureId)
      res.status(200).json(feature)
    } catch (err) {
      next(err)
    }
  },

  replaceFeature: async (req, res, next) => {
    try {
      const { featureId } = req.params
      const newFeature = req.body
      const result = await Feature.findByIdAndUpdate(featureId, newFeature)
      res
        .status(200)
        .json({ message: `${featureId} has been replaced`, newFeature: result })
    } catch (err) {
      next(err)
    }
  },

  updateFeature: async (req, res, next) => {
    try {
      const { featureId } = req.params
      const newFeature = req.body
      const result = await Feature.findByIdAndUpdate(featureId, newFeature)
      res.status(200).json({ message: `${featureId} has been updated` })
    } catch (err) {
      next(err)
    }
  },
  getFeatureScenarios: async (req, res, next) => {
    const { featureId } = req.params
    const feature = await Feature.findById(featureId).populate('scenarios')
    res.status(200).json(feature.scenarios)
  },
  newFeatureScenario: async (req, res, next) => {
    const { featureId } = req.params
    // Create a new Scenario
    const newScenario = new Scenario(req.body)
    // Get Feature
    const feature = await Feature.findById(featureId)
    // Assign Scenarios to Feature
    newScenario.feature_file = feature
    // Save the scenario
    await newScenario.save()
    // Add Scenario to Feature's 'scenarios' array
    feature.scenarios.push(newScenario)
    await feature.save()
    res.status(201).json(newScenario)
  },
}
