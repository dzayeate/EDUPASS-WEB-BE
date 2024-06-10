'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biodate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Biodate.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nik: DataTypes.STRING,
    institutionName: DataTypes.STRING,
    institutionLevel: DataTypes.STRING,
    province: DataTypes.STRING,
    regencies: DataTypes.STRING,
    studyField: DataTypes.STRING,
    reason: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Biodate',
  });
  return Biodate;
};
