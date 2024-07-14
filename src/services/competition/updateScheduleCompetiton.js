const { StatusCodes } = require('http-status-codes');
const schema = require('../../schemas/validations/competition/scheduleCompetition');
const BaseError = require('../../schemas/responses/BaseError');
const { Competition, sequelize, ScheduleCompetition } = require("../../models");

const updateScheduleCompetition = async (id, body) => {
  const { error, value } = schema.validate(body);
  if (error) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: error.message
    });
  }

  const { date, name, category, time, location, description, competitionId } = value;

  const competition = await Competition.findByPk(competitionId);
  if (!competition) {
    throw new BaseError({
      status: StatusCodes.NOT_FOUND,
      message: 'Competition not found'
    });
  }

  const scheduleCompetition = await ScheduleCompetition.findByPk(id);
  if (!scheduleCompetition) {
    throw new BaseError({
      status: StatusCodes.NOT_FOUND,
      message: 'Schedule competition not found'
    });
  }

  const transaction = await sequelize.transaction();

  try {
    await scheduleCompetition.update({
      date,
      name,
      category,
      time,
      location,
      description,
      competitionId
    }, { transaction });

    await transaction.commit();
    return scheduleCompetition;
  } catch (error) {
    await transaction.rollback();
    throw new BaseError({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Unable to update schedule competition'
    });
  }
};

module.exports = updateScheduleCompetition;
