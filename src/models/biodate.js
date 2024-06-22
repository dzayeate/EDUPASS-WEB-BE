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
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true
    },
    regencies: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const image = this.getDataValue('image');
        console.log('Getting proof URL:', this.getDataValue('image'));
        if (!image) {
          return null;
        }
        const baseUrl = process.env.BASE_URL;
        const imageUrlParts = this.getDataValue('image').split('/');
        const filename = imageUrlParts[imageUrlParts.length - 1];
        return `${baseUrl}/file/download?url=${image}&filename=${filename}`;
      }
    },
    institutionName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    field: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pupils: {
      type: DataTypes.STRING,
      allowNull: true
    },
    proof: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const proof = this.getDataValue('proof');
        console.log('Getting proof URL:', this.getDataValue('proof'));
        if (!proof) {
          return null;
        }
        const imageUrlParts = this.getDataValue('proof').split('/');
        const filename = imageUrlParts[imageUrlParts.length - 1];
        return `${baseUrl}/file/download?url=${proof}&filename=${filename}`;
      }
    },
  }, {
    sequelize,
    modelName: 'Biodate',
  });
  return Biodate;
};
