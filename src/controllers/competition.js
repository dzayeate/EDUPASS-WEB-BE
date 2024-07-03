const { StatusCodes } = require('http-status-codes');
const BaseResponse = require('../schemas/responses/BaseResponse');
const DataTable = require('../schemas/responses/DataTable');
const BaseError = require('../schemas/responses/BaseError');
const registerCompetition = require('../services/competition/register');
const registerCompetitionEO = require('../services/competition/register-competition-eo');
const findCompetition = require('../services/competition/findCompetition');

const RegisterCompetition = async (req, res) => {
    try {
        const user = res.locals.user;
        if (!user) {
            throw new Error('User not found');
        }
        const { body, file } = req;
        const result = await registerCompetition(body, user, file);
        res.status(StatusCodes.CREATED).json(
            new BaseResponse({
                status: StatusCodes.CREATED,
                message: 'Berhasil mendaftarkan lomba',
                data: result
            })
        );
        
    } catch (error) {
        console.error("Error during registration:", error);
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json(
            new BaseError({
                status: status,
                message: error.message || 'Internal Server Error',
                error: error.stack // Add this line to include the stack trace in the response for debugging
            })
        );
    }
}

const RegisterCompetitionEO = async (req, res) => {
    try {
        const { body, files } = req;
        const user = res.locals.user;

        console.log("Request received for registering competition:", { user, body, files });

        if (!user || !user.id) {
            throw new BaseError({
                status: StatusCodes.UNAUTHORIZED,
                message: 'User is not authenticated',
            });
        }

        // Parse teamMembers if it's a string and ensure it is an array
        if (body.teamMembers && typeof body.teamMembers === 'string') {
            try {
                const parsedTeamMembers = JSON.parse(body.teamMembers);
                if (!Array.isArray(parsedTeamMembers)) {
                    throw new Error('teamMembers must be an array');
                }
                body.teamMembers = parsedTeamMembers;
            } catch (error) {
                throw new BaseError({
                    status: StatusCodes.BAD_REQUEST,
                    message: 'Invalid JSON format for teamMembers or teamMembers is not an array',
                });
            }
        }

        const result = await registerCompetitionEO(user.id, body, files);

        console.log("Competition registration result:", result);
        res.status(StatusCodes.CREATED).json(
            new BaseResponse({
                status: StatusCodes.CREATED,
                message: 'Berhasil mendaftarkan lomba',
                data: result.data
            })
        );
    } catch (error) {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        console.error("Error in RegisterCompetitionEO controller:", error);
        res.status(status).json(
            new BaseError({
                status: status,
                message: error.message || 'Internal Server Error',
                error: error.stack
            })
        );
    }
};

const FindCompetition = async (req, res) => {
    try {
      const users = await findCompetition(req.query);
      res.status(StatusCodes.OK).json(new DataTable(users.data, users.total));
    } catch (error) {
      const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
      res
        .status(status)
        .json(
          new BaseResponse({
            status: status,
            message: error.message
          })
        )
    }
  }

module.exports = {
    RegisterCompetition,
    RegisterCompetitionEO,
    FindCompetition
}