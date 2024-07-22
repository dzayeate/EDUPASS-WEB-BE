const { CompetitionRegistration, CompetitionTeam, User, sequelize } = require("../../models");
const constant = require("../../utils/constant");
const { Op } = require('sequelize');

const FindCompetitionRegistrations = async (body, query) => {
  const page = parseInt(query.page, 10) || 1;
  const length = parseInt(query.length, 10) || constant.PAGE_SIZE;
  const offset = (page - 1) * length;

  const { count: total, rows: data } = await CompetitionRegistration.findAndCountAll({
    offset,
    limit: length,
    where: generateWhereClause(body),
    include: [
      {
        model: CompetitionTeam,
        as: 'teamMembers',
        attributes: ['userId']
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
  const whereClause = {};

  if (search) {
    whereClause[Op.or] = [
      { domicile: { [Op.like]: `%${search}%` } },
      { phoneNumber: { [Op.like]: `%${search}%` } }
    ];
  }

  return whereClause;
};

module.exports = FindCompetitionRegistrations;
