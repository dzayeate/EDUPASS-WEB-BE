const sequelize = require('sequelize');
const db = require('../../config/database');
const Roles = require('./roles');

const Users = db.define('users', {
  id: {
    type: sequelize.STRING,
    defaultValue: sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'users'
})

Users.belongsTo(Roles, { foreignKey: 'roleId' });

module.exports = Users
