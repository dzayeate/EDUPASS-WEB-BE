'use strict';
const { allow } = require('joi');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competition extends Model {
    static associate(models) {
      // define association here
      Competition.hasMany(models.CompetitionOrganizer, {
        foreignKey: 'CompetitionId',
        as: 'organizer'
      });
      Competition.hasMany(models.CompetitionMentor, {
        foreignKey: 'CompetitionId',
        as: 'mentor'
      });
      Competition.hasMany(models.Sponsor, {
        foreignKey: 'CompetitionId',
        as: 'sponsor'
      });

    }
  }
  Competition.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false
    },
    banner: {
      type: DataTypes.STRING,
      get() {
        const banner = this.getDataValue('banner');
        if (!banner) {
          return null;
        }
        const baseUrl = process.env.BASE_URL;
        const imageUrlParts = this.getDataValue('banner').split('/');
        const filename = imageUrlParts[imageUrlParts.length - 1];
        return `${baseUrl}/file/download?url=${image}&filename=${filename}`;
      }
    },
  }, {
    sequelize,
    modelName: 'Competition',
  });
  return Competition;
};
