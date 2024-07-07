'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompetitionOrganizer extends Model {
    static associate(models) {
      // define association here
      CompetitionOrganizer.belongsTo(models.Competition, {
        foreignKey: 'competitionId',
        as: 'competition',
        onDelete: 'CASCADE'
      });
      CompetitionOrganizer.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'organizer',
        onDelete: 'CASCADE'
      });
      
    }
  }
  CompetitionOrganizer.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    competitionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Competition',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Organizer',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'CompetitionOrganizer',
  });
  return CompetitionOrganizer;
};
