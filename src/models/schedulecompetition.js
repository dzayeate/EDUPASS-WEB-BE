'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScheduleCompetition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScheduleCompetition.belongsTo(models.Competition, {
        foreignKey: 'competitionId',
        as: 'competition',
        onDelete: 'CASCADE',
      }
      )
      
    }
  }
  ScheduleCompetition.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    name: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.ENUM('online', 'offline', 'hybrid'),
    },
    time: {
      type: DataTypes.TIME,
    },
    location: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    competitionId: {
      type: DataTypes.UUID,
      references: {
        model: 'Competition',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },{
    sequelize,
    modelName: 'ScheduleCompetition',
  });
  return ScheduleCompetition;
};