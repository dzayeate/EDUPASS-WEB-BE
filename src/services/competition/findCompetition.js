const { Competition, CompetitionMentor, CompetitionOrganizer, CompetitionRegistration, User, Sponsor, sequelize } = require("../../models");
const { Op } = require('sequelize');
const { isUUID } = require('validator');
const constant = require("../../utils/constant");

const FindCompetition = async (body, query) => {
  const page = parseInt(query.page) || 1;
  const length = parseInt(query.length) || constant.PAGE_SIZE;
  const offset = (page - 1) * length;

  const competitions = await Competition.findAll({
    offset,
    limit: length,
    where: generateWhereClause(body),
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: CompetitionMentor,
        as: 'mentor',
        attributes: ['userId']
      },
      {
        model: Sponsor,
        as: 'sponsor',
        attributes: ['userId']
      },
      {
        model: CompetitionRegistration,
        as: 'registrations',
        attributes: []
      }
    ],
    attributes: {
      include: [
        [
          sequelize.fn('COUNT', sequelize.col('registrations.id')),
          'registrationCount'
        ]
      ]
    },
    group: ['Competition.id', 'mentor.id', 'sponsor.id'],
    subQuery: false
  });

  const total = await Competition.count({
    where: generateWhereClause(body)
  });

  return {
    total,
    data: competitions
  };
};

const generateWhereClause = (body) => {
  const { search, date, category, time, location, platform } = body;
  const whereClause = {};

  if (search) {
    if (isUUID(search)) {
      whereClause.id = search;
    } else {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { date: { [Op.like]: `%${search}%` } },
        { category: { [Op.like]: `%${search}%` } },
        { time: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } },
        { platform: { [Op.like]: `%${search}%` } }
      ];
    }
  }

  if (date) {
    whereClause.date = date;
  }

  if (category) {
    whereClause.category = {
      [Op.like]: `%${category}%`
    };
  }

  if (time) {
    whereClause.time = time;
  }

  if (location) {
    whereClause.location = {
      [Op.like]: `%${location}%`
    };
  }

  if (platform) {
    whereClause.platform = {
      [Op.like]: `%${platform}%`
    };
  }

  return whereClause;
};

module.exports = FindCompetition;

