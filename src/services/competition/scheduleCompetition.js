const { Competition, sequelize, ScheduleCompetition } = require("../../models");

const schema = require("../../schemas/validations/competition/scheduleCompetition");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../schemas/responses/BaseError");


const addScheduleCompetition = async (body) => {
    const { error, value } = schema.validate(body);
    if (error) {
        throw new BaseError({
            status: StatusCodes.BAD_REQUEST,
            message: error.message,
        });
    }
    const { date,name, category, time, location, description, competitionId } = value;
    const competition = await Competition.findByPk(competitionId);
    if (!competition) {
        throw new BaseError({
            status: StatusCodes.NOT_FOUND,
            message: "Competition not found",
        });
    }

    const transaction = await sequelize.transaction();
    
    try {
        const scheduleCompetition = await ScheduleCompetition.create({
            date,
            name,
            category,
            time,
            location,
            description,
            competitionId,
        }, { transaction });

        await transaction.commit();
        return scheduleCompetition;
    } catch (error) {
        await transaction.rollback();
        throw new BaseError({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
}

module.exports = addScheduleCompetition;