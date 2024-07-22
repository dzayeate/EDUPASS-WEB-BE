const { Competition, ScheduleCompetition, sequelize } = require("../../models");
const constant = require("../../utils/constant");
const { Op } = require('sequelize');

const findScheduleCompetitions = async (body, query) => {
    const page = parseInt(query.page, 10) || 1;
    const length = parseInt(query.length, 10) || constant.PAGE_SIZE;
  
    const offset = (page - 1) * length;
  
    const { count: total, rows: data } = await ScheduleCompetition.findAndCountAll({
        offset,
        limit: length,
        where: generateWhereClause(body),
        include: [
            {
                model: Competition,
                as: 'competition',
                attributes: ['id', 'name']
            }
        ],
        order: [
            ['date', 'DESC']
        ]
    });
  
    return { total, data };
};

  const generateWhereClause = (body) => {
    const { search } = body;
    const whereClause = {};
  
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { category: { [Op.like]: `%${search}%` } },
      ];
    }
  
    return whereClause;
  };

module.exports = findScheduleCompetitions;