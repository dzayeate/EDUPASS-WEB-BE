const sequelize = require('sequelize');
const db = require('../../config/database');

const Roles = db.define('users', {
  id: {
    type: sequelize.STRING,
    defaultValue: sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'roles'
})

module.exports = Roles
