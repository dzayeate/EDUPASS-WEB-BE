const { Competition, CompetitionMentor, CompetitionOrganizer, sequelize, User, Sponsor  } = require("../../models");
const schema = require("../../schemas/validations/competition/register");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../schemas/responses/BaseError");
const { isValidUser } = require("../../utils/validate_user");

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
        banner
    } = value;

    


}

