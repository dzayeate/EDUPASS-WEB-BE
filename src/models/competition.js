'use strict';

const baseUrl = process.env.BASE_URL;

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
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
        if (value && value.includes(baseUrl)) {
          const url = new URL(value);
          this.setDataValue('banner', url.searchParams.get('fileName'));
        } else {
          this.setDataValue('banner', value);
        }
      }
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const thumbnailUrl = this.getDataValue('thumbnail');
        if (!thumbnailUrl) {
          return null;
        }
        return {
          downloadUrl: `${baseUrl}/file/download?fieldName=thumbnail&fileName=${thumbnailUrl}`,
          previewUrl: `${baseUrl}/file/preview?fieldName=thumbnail&fileName=${thumbnailUrl}`
        };
      },
      set(value) {
        if (value && value.includes(baseUrl)) {
          const url = new URL(value);
          this.setDataValue('thumbnail', url.searchParams.get('fileName'));
        } else {
          this.setDataValue('thumbnail', value);
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Competition',
  });

  return Competition;
};
