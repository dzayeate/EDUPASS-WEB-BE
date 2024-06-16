'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompetitionMentor extends Model {
    static associate(models) {
      // define association here
    }
  }
  CompetitionMentor.init({
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
    MentorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Mentor',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'CompetitionMentor',
  });
  return CompetitionMentor;
};
