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
      Biodate.hasOne(models.User, {
        foreignKey: 'biodateId',
        as: 'user',
      });
    }
  }
  Biodate.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nik: {
      type: DataTypes.STRING,
      unique: true
    },
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
