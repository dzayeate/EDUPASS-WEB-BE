'use strict';

const baseUrl = process.env.BASE_URL;

const { Model } = require('sequelize');

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
      type: DataTypes.DATEONLY,
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
        const imageUrl = this.getDataValue('image');
        if (!imageUrl) {
          return null;
        }
        return {
          downloadUrl: `${baseUrl}/file/download?fieldName=image&fileName=${imageUrl}`,
          previewUrl: `${baseUrl}/file/preview?fieldName=image&fileName=${imageUrl}`
        };
      },
      set(value) {
        if (typeof value === 'object' && value !== null) {
          this.setDataValue('image', value.downloadUrl ? new URL(value.downloadUrl).searchParams.get('fileName') : null);
        } else if (typeof value === 'string' && value.includes(baseUrl)) {
          const url = new URL(value);
          this.setDataValue('image', url.searchParams.get('fileName'));
        } else {
          this.setDataValue('image', value);
        }
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
        if (!proof) {
          return null;
        }
        return `${baseUrl}/file/download?fieldName=proof&fileName=${proof}`;
      },
      set(value) {
        if (typeof value === 'object' && value !== null) {
          this.setDataValue('proof', value.downloadUrl ? new URL(value.downloadUrl).searchParams.get('fileName') : null);
        } else if (typeof value === 'string' && value.includes(baseUrl)) {
          const url = new URL(value);
          this.setDataValue('proof', url.searchParams.get('fileName'));
        } else {
          this.setDataValue('proof', value);
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Biodate',
  });

  return Biodate;
};
