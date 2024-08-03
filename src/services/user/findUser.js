const { User, Role, Biodate, CompetitionRegistration, Competition, CompetitionTeam } = require("../../models");
const constant = require("../../utils/constant");
const { Op } = require('sequelize');
const { isUUID, isEmail } = require('validator');

const FindUsers = async (body, query) => {
  const page = parseInt(query.page) || 1;
  const length = parseInt(query.length) || constant.PAGE_SIZE;
  const offset = (page - 1) * length;

  const whereClause = generateWhereClause(body);

  const { count: total, rows: users } = await User.findAndCountAll({
    offset,
    limit: length,
    attributes: ['id', 'email', 'isVerified', 'requestedRole', 'createdAt'],
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
      },
      {
        model: CompetitionRegistration,
        as: 'registrations',
        include: {
          model: Competition,
          as: 'competition',
          attributes: ['id', 'name', 'date']
        }
      },
      {
        model: CompetitionTeam,
        as: 'teamMembers',
        include: {
          model: CompetitionRegistration,
          as: 'registration',
          include: {
            model: Competition,
            as: 'competition',
            attributes: ['id', 'name', 'date']
          }
        }
      }
    ],
    order: [
      ['createdAt', 'DESC']
    ]
  });

  const data = users.map(user => {
    const registrations = user.registrations || [];
    const teamRegistrations = user.teamMembers.map(member => member.registration) || [];
    const allRegistrations = [...registrations, ...teamRegistrations];
    const registeredCompetitions = allRegistrations.length;
    const startedCompetitions = allRegistrations.filter(reg => new Date(reg.competition.date) <= new Date()).length;
    const notStartedCompetitions = registeredCompetitions - startedCompetitions;

    return {
      id: user.id,
      email: user.email,
      isVerified: user.isVerified,
      requestedRole: user.requestedRole,
      role: user.role,
      biodate: user.biodate,
      registeredCompetitions,
      startedCompetitions,
      notStartedCompetitions,
      activities: allRegistrations.map(reg => ({
        competitionName: reg.competition.name,
        competitionDate: reg.competition.date,
        status: new Date(reg.competition.date) <= new Date() ? 'Started' : 'Not Started'
      }))
    };
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
    } else if (isEmail(search)) {
      userWhereClause.email = {
        [Op.like]: `%${search}%`
      };
    } else {
      biodateWhereClause[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } }
      ];
    }
  }

  return { userWhereClause, biodateWhereClause };
};

module.exports = FindUsers;
