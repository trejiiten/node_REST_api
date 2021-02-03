'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Environment_Feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Environment_Feature.init({
    environment_id: DataTypes.INTEGER,
    feature_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'environment_feature',
    modelName: 'Environment_Feature',
  });
  return Environment_Feature;
};