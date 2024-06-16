'use strict';

const baseUrl = process.env.BASE_URL;

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biodate extends Model {
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nik: {
      type: DataTypes.STRING,
      unique: true
    },
    institutionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    institutionLevel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false
    },
    regencies: {
      type: DataTypes.STRING,
      allowNull: false
    },
    studyField: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      get() {
        const image = this.getDataValue('image');
        if (!image) {
          return null;
        }
        const baseUrl = process.env.BASE_URL;
        const imageUrlParts = this.getDataValue('image').split('/');
        const filename = imageUrlParts[imageUrlParts.length - 1];
        return `${baseUrl}/file/download?url=${image}&filename=${filename}`;
      }
    },
  }, {
    sequelize,
    modelName: 'Biodate',
  });
  return Biodate;
};
