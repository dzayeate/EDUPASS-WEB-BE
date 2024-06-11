const { User, Role, Biodate } = require("../../models");
const constant = require("../../utils/constant");
const { Op } = require('sequelize');

const FindUsers = async (body) => {
  const page = 1;
  const length = constant.PAGE_SIZE;

  const offset = (page - 1) * length;

  const { count: total, rows: data } = await User.findAndCountAll({
    offset,
    limit: length,
    attributes: ['id', 'email'],
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['name']
      },
      {
        model: Biodate,
        as: 'biodate',
        attributes: ['firstName', 'lastName', 'nik', 'institutionName', 'institutionLevel', 'province', 'regencies', 'studyField', 'reason', 'image'],
        where: generateWhereClause(body)
      }
    ]
  });

  return {
    total,
    data
  };
};

const generateWhereClause = (body) => {
  const { search } = body;
  const whereClause = {};

  if (search) {
    whereClause.firstName = {
      [Op.like]: `%${search}%`
    };
  }

  return whereClause;
};

module.exports = FindUsers;
