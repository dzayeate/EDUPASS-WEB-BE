'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Benefit extends Model {
    static associate(models) {
      Benefit.belongsToMany(models.Competition, { through: 'CompetitionBenefit', foreignKey: 'BenefitId' });
    }
  }
  Benefit.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Benefit',
  });
  return Benefit;
};
