const { Competition } = require("../../models");
const constant = require("../../utils/constant");
const { Op } = require('sequelize');

const FindCompetition = async (body) => {
  const page = 1;
  const length = constant.PAGE_SIZE;

  const offset = (page - 1) * length;

  const { count: total, rows: data } = await Competition.findAndCountAll({
    offset,
    limit: length,
    where: generateWhereClause(body)
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
    whereClause.name = {
      [Op.like]: `%${search}%`
    };
  }

  return whereClause;
};

module.exports = FindCompetition;
