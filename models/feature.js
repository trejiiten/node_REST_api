const Scenario = require('./scenario');

module.exports = (sequelize, DataTypes) => {
  const Feature = sequelize.define("Feature", {
    feature_file_title: {type: DataTypes.STRING, unique: true},
    feature_file_type: DataTypes.STRING,
    feature_file_location: DataTypes.STRING,
    scenarios: [
      {
        type: Schema.Types.ObjectId,
        ref: "Scenario",
      },
    ],
    total_tests: DataTypes.INTEGER,
    total_time: DataTypes.INTEGER,
  });
  Feature.hasMany(Scenario);
  return Feature;
};
