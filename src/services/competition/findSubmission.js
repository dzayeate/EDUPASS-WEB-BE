const { CompetitionSubmission } = require("../../models");
const { Op } = require('sequelize'); // Ensure this is imported
const constant = require("../../utils/constant");
const { isUUID } = require('validator'); // Ensure this is imported

const FindSubmission = async (body, query) => {
  const page = parseInt(query.page) || 1;
  const length = parseInt(query.length) || constant.PAGE_SIZE;
  const offset = (page - 1) * length;

  const submissions = await CompetitionSubmission.findAll({
    offset,
    limit: length,
    where: generateWhereClause(body),
    order: [['createdAt', 'DESC']],
  });

  return submissions;
};

const generateWhereClause = (body) => {
  const { search } = body;
  const whereClause = {};

  if (search) {
    if (isUUID(search)) {
      whereClause.id = search;
    } else {
      whereClause[Op.or] = [
        { url: { [Op.like]: `%${search}%` } },
      ];
    }
  }

  return whereClause;
};

module.exports = FindSubmission;

