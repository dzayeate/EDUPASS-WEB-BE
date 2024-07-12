const { User, Role, Biodate } = require("../../models");
const constant = require("../../utils/constant");
const { Op } = require('sequelize');
const { isUUID } = require('validator');

const FindUsers = async (body, query) => {
  const page = parseInt(query.page) || 1;
  const length = parseInt(query.length) || constant.PAGE_SIZE;

  const offset = (page - 1) * length;

  const whereClause = generateWhereClause(body);

  const { count: total, rows: data } = await User.findAndCountAll({
    offset,
    limit: length,
    attributes: ['id', 'email'],
    where: whereClause.userWhereClause,
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['name']
      },
      {
        model: Biodate,
        as: 'biodate',
        attributes: ['id', 'firstName', 'lastName', 'birthDate', 'gender', 'phone', 'address', 'province', 'regencies', 'image', 'institutionName', 'field', 'pupils', 'proof'],
        where: whereClause.biodateWhereClause
      }
    ],
    order: [
      ['createdAt', 'DESC']
    ]
  });

  return {
    total,
    data
  };
};

const generateWhereClause = (body) => {
  const { search } = body;
  const userWhereClause = {};
  const biodateWhereClause = {};

  if (search) {
    if (isUUID(search)) {
      userWhereClause.id = search;
    } else {
      biodateWhereClause.firstName = {
        [Op.like]: `%${search}%`
      };
    }
  }

  return { userWhereClause, biodateWhereClause };
};

module.exports = FindUsers;
