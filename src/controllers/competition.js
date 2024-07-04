const { StatusCodes } = require('http-status-codes');
const BaseResponse = require('../schemas/responses/BaseResponse');
const DataTable = require('../schemas/responses/DataTable');
const BaseError = require('../schemas/responses/BaseError');
const registerCompetition = require('../services/competition/register');
const registerCompetitionPeserta = require('../services/competition/registerCompetitonPeserta');
const findCompetition = require('../services/competition/findCompetition');
const findCompetitionRegistration = require('../services/competition/findCompetitionRegistrations');

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
                error: error.stack
            })
        );
    }
}

const RegisterCompetitionPeserta = async (req, res) => {
    try {
        const { body, files } = req;
        const user = res.locals.user;

        if (!user || !user.id) {
            throw new BaseError({
                status: StatusCodes.UNAUTHORIZED,
                message: 'User is not authenticated',
            });
        }

        if (body.teamSize === '') {
            body.teamSize = null;
        } else if (body.teamSize) {
            body.teamSize = Number(body.teamSize);
        }

        // Handle teamMembers correctly
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
        } else if (body.teamMembers === '') {
            body.teamMembers = []; // Ensure it's an empty array if not provided
        }

        const result = await registerCompetitionPeserta(user.id, body, files);

        // Include teamMembers in the response
        result.data.teamMembers = body.teamMembers;

        res.status(StatusCodes.CREATED).json(
            new BaseResponse({
                status: StatusCodes.CREATED,
                message: 'Berhasil mendaftarkan lomba',
                data: result.data // Ensure teamMembers is included in result.data if processed correctly
            })
        );
    } catch (error) {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json(
            new BaseResponse({
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

const FindCompetitionRegistration = async (req, res) => {
    try {
      const competition = await findCompetitionRegistration(req.query);
      res.status(StatusCodes.OK).json({
        data: competition.data,
        total: competition.total
      });
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
};

module.exports = {
    RegisterCompetition,
    RegisterCompetitionPeserta,
    FindCompetition,
    FindCompetitionRegistration
}