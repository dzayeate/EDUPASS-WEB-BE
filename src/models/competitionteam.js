'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompetitionTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompetitionTeam.belongsTo(models.CompetitionRegistration, {
        foreignKey: 'registrationId',
        as: 'registration',
      });
      CompetitionTeam.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'member',
      });
    }
  }
  CompetitionTeam.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    registrationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'CompetitionRegistration',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'CompetitionTeam',
  });
  return CompetitionTeam;
};