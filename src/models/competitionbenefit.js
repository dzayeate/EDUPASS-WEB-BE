'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompetitionBenefit extends Model {
    static associate(models) {
      // define association here
    }
  }
  CompetitionBenefit.init({
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
    BenefitId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Benefit',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'CompetitionBenefit',
  });
  return CompetitionBenefit;
};
