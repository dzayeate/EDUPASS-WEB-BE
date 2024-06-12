'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organizer extends Model {
    static associate(models) {
      Organizer.belongsToMany(models.Competition, { through: 'CompetitionOrganizer', foreignKey: 'OrganizerId' });
    }
  }
  Organizer.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactInfo: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Organizer',
  });
  return Organizer;
};
