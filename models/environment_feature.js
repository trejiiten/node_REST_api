// const sequelize = require('sequelize')
// const Environment = require('./environment')
// const Feature = require('./feature')

// module.exports = (sequelize) => {
//   const EnvironmentFeature = sequelize.define(
//     'Environment_Feature',
//     {},
//     { timestamps: false }
//   )
//   Environment.belongsToMany(Feature, { through: EnvironmentFeature })
//   Feature.belongsToMany(Environment, { through: EnvironmentFeature })
//   return EnvironmentFeature
// }
