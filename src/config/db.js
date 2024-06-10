// db.js
const { Sequelize } = require('sequelize');
const config = require('./config.js');

// Choose the appropriate environment (development, test, production)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

module.exports = sequelize;
