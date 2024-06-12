'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompetitionOrganizer extends Model {
    static associate(models) {
      // define association here
    }
  }
  CompetitionOrganizer.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    CompetitionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Competition',
        key: 'id'
      }
    },
    OrganizerId: {
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
