'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class forgotPassword extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
          // define association here
          forgotPassword.belongsTo(models.User, {
              foreignKey: 'userId',
              as: 'user',
          });
      }
  }
  forgotPassword.init({
      id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false
      },
      token: {
          type: DataTypes.STRING,
          allowNull: false
      },
      expiredAt: {
          type: DataTypes.DATE,
          allowNull: false
      }
  }, {
      sequelize,
      modelName: 'forgotPassword',
  });
  return forgotPassword;
};


