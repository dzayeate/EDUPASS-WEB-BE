'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organizer extends Model {
    static associate(models) {
      Organizer.belongsToMany(models.User, {
        through:'Organizer',
        foreignKey: 'userId',
        as: 'organizer'
      });
    }
  }
  Organizer.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
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
