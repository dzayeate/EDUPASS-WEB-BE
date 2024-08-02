'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompetitionSubmission extends Model {
    static associate(models) {
      CompetitionSubmission.belongsTo(models.CompetitionRegistration, {
        foreignKey: 'registrationId',
        as: 'registration'
      });
    }
  }
  CompetitionSubmission.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    registrationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'CompetitionSubmission',
  });
  return CompetitionSubmission;
};
