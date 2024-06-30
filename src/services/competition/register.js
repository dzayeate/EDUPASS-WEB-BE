const { Competition, CompetitionMentor, CompetitionOrganizer, sequelize, User, Sponsor  } = require("../../models");
const schema = require("../../schemas/validations/competition/register");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../schemas/responses/BaseError");

const { Op } = require("sequelize");


const RegisterCompetition = async (body, user, file) => {
    const { error, value } = schema.validate(body);
    if (error) {
        throw new BaseError({
            status: StatusCodes.BAD_REQUEST,
            message: error.details[0].message,
        });
    }

    const {
        name,
        description,
        date,
        time,
        location,
        platform,
        banner,
        mentors,
        sponsors,
    } = value;

    const transaction = await sequelize.transaction();

    try {

        const organizer = user;


        const competition = await Competition.create({
            name,
            description,
            date,
            time,
            location,
            platform,
            banner,
        },
    { transaction }
    );

    await CompetitionOrganizer.create({
        competitionId: competition.id,
        userId: organizer.id,
    },
    { transaction }
    );

    
    
    
    await transaction.commit();
    return competition;

} catch (error) {
    await transaction.rollback();
    throw error;
}}

module.exports = RegisterCompetition;
