'use strict';
const { allow } = require('joi');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competition extends Model {
    static associate(models) {
      Competition.belongsToMany(models.Benefit, { through: 'CompetitionBenefit', foreignKey: 'CompetitionId' });
      Competition.belongsToMany(models.Organizer, { through: 'CompetitionOrganizer', foreignKey: 'CompetitionId' });
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
  }, {
    sequelize,
    modelName: 'Competition',
  });
  return Competition;
};
