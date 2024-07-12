const { Competition } = require("../../models");
const constant = require("../../utils/constant");
const { Op } = require('sequelize');
const { isUUID } = require('validator');

const FindCompetition = async (body, query) => {
  const page = parseInt(query.page) || 1;
  const length = parseInt(query.length) || constant.PAGE_SIZE; 

  const offset = (page - 1) * length;

  const { count: total, rows: data } = await Competition.findAndCountAll({
    offset,
    limit: length,
    where: generateWhereClause(body),
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
  const whereClause = {};

  if (search) {
    if (isUUID(search)) {
      whereClause.id = search;
    } else {
      whereClause.name = {
        [Op.like]: `%${search}%`
      };
    }
  }

  return whereClause;
};

module.exports = FindCompetition;
