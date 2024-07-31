'use strict';
const {
  Model, Op
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
        onDelete: 'CASCADE',
      });
      User.hasMany(models.forgotPassword, {
        foreignKey: 'userId',
        as: 'forgotPassword',
      });
      User.hasMany(models.CompetitionMentor, {
        foreignKey: 'UserId',
        as: 'mentor',
      });
      User.hasMany(models.CompetitionOrganizer, {
        foreignKey: 'userId',
        as: 'organizer'
      });
      User.hasMany(models.Sponsor, {
        foreignKey: 'userId',
        as:'sponsor'
      });
      User.hasMany(models.CompetitionRegistration, {
        foreignKey: 'userId',
        as: 'registrations',
      });
      User.hasMany(models.CompetitionTeam, {
        foreignKey: 'userId',
        as: 'teamMembers',
      });
    }

    static getBiodate() {
      return this.biodate;
    }

    static async getUserByKeyword(keyword) {
      return this.findOne({
        where: {
          [Op.or]: [
            { email: { [Op.like]: `%${keyword}%` } },
            { '$biodate.firstName$': { [Op.like]: `%${keyword}%` } },
            { '$biodate.lastName$': { [Op.like]: `%${keyword}%` } }
          ]
        },
        include: [{
          model: sequelize.models.Biodate,
          as: 'biodate',
          attributes: ['firstName', 'lastName']
        }]
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
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    requestedRole: {
      type: DataTypes.STRING,
      allowNull: true
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
