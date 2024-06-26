'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
      });
      User.belongsTo(models.Biodate, {
        foreignKey: 'biodateId',
        as: 'biodate',
      });
      User.hasMany(models.forgotPassword, {
        foreignKey: 'userId',
        as: 'forgotPassword',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    biodateId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Biodate',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
