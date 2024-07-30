'use strict';

const baseUrl = process.env.BASE_URL;

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CompetitionRegistration extends Model {
    static associate(models) {
      CompetitionRegistration.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      CompetitionRegistration.belongsTo(models.Competition, {
        foreignKey: 'competitionId',
        as: 'competition',
      });
      CompetitionRegistration.hasMany(models.CompetitionTeam, {
        foreignKey: 'registrationId',
        as: 'teamMembers',
        onDelete: 'CASCADE',
      });
      CompetitionRegistration.hasMany(models.CompetitionSubmission, {
        foreignKey: 'registrationId',
        as: 'submissions'
      });
    }
  }

  CompetitionRegistration.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    competitionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Competition',
        key: 'id'
      }
    },
    nameTeam: {
      type: DataTypes.STRING,
      allowNull: true
    },
    domicile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supportingDocuments: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const documentUrl = this.getDataValue('supportingDocuments');
        if (!documentUrl) {
          return null;
        }
        return `${baseUrl}/file/download?fieldName=supportingDocuments&fileName=${documentUrl}`;
      },
      set(value) {
        if (value && value.includes(baseUrl)) {
          const url = new URL(value);
          this.setDataValue('supportingDocuments', url.searchParams.get('fileName'));
        } else {
          this.setDataValue('supportingDocuments', value);
        }
      }
    },
    isTeam: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    teamSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        isTeamCheck(value) {
          if (this.isTeam && (value === null || value < 1)) {
            throw new Error('Team size must be provided and greater than 0 if isTeam is true.');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CompetitionRegistration',
  });

  return CompetitionRegistration;
};
