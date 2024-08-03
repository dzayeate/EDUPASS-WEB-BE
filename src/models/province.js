'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    static associate(models) {
      Province.hasMany(models.Biodate, {
        foreignKey: 'provinceId',
        as: 'biodates',
      });
    }
    static async getIdByName(name) {
      const province = await this.findOne({
        where: { name },
        attributes: ['id'],
      });
      return province ? province.id : null;
    }

  }
  Province.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Province',
  });
  return Province;
};