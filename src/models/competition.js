'use strict';

const { allow } = require('joi');
const baseUrl = process.env.BASE_URL;

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competition extends Model {
    static associate(models) {
      // define association here
      Competition.hasMany(models.CompetitionOrganizer, {
        foreignKey: 'competitionId',
        as: 'organizer'
      });
      Competition.hasMany(models.CompetitionMentor, {
        foreignKey: 'competitionId',
        as: 'mentor'
      });
      Competition.hasMany(models.Sponsor, {
        foreignKey: 'competitionId',
        as: 'sponsor'
      });
      Competition.hasMany(models.ScheduleCompetition, {
        foreignKey: 'competitionId',
        as: 'schedule'
      });
      Competition.hasMany(models.CompetitionRegistration, {
        foreignKey: 'competitionId',
        as: 'registrations'
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
    category: {
      type: DataTypes.STRING,
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
      allowNull: true,
      get() {
        const bannerUrl = this.getDataValue('banner');
        if (!bannerUrl) {
          return null;
        }
        return {
          downloadUrl: `${baseUrl}/file/download?fieldName=banner&fileName=${bannerUrl}`,
          previewUrl: `${baseUrl}/file/preview?fieldName=banner&fileName=${bannerUrl}`
        };
      },
      set(value) {
        if( value && value.includes(baseUrl)) {
          const url = new URL(value);
          this.setDataValue('banner', url.searchParams.get('fileName'));
        } else {
          this.setDataValue('banner', value);
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Competition',
  });
  return Competition;
};
