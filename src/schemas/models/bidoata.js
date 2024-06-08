const sequelize = require('sequelize');
const db = require('../../config/database');

const Biodate = db.define('biodate', {
  id: {
    type: sequelize.STRING,
    defaultValue: sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: sequelize.STRING,
    allowNull: false,
  },
  NIK: {
    type: sequelize.STRING,
    allowNull: true
  },
  institutionName:{
    type: sequelize.STRING,
    allowNull: false
  },
  institutionName: {
    type: sequelize.STRING,
    allowNull: false
  },
  province: {
    type: sequelize.STRING,
    allowNull: false
  },
  regencies: {
    type: sequelize.STRING,
    allowNull: false,
  },
  studyField: {
    type: sequelize.STRING,
    allowNull: false,
  },
  reason: {
    type: sequelize.STRING,
    allowNull: false
  },
  image: {
    type: sequelize.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'biodate'
})

Biodate.belongsTo(Users, { foreignKey: 'userId' });

module.exports = Biodate
