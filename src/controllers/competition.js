const { StatusCodes } = require('http-status-codes');
const BaseResponse = require('../schemas/responses/BaseResponse');
const DataTable = require('../schemas/responses/DataTable');
const BaseError = require('../schemas/responses/BaseError');
const registerCompetition = require('../services/competition/register');
const registerCompetitionPeserta = require('../services/competition/registerCompetitonPeserta');
const findCompetition = require('../services/competition/findCompetition');
const findCompetitionRegistration = require('../services/competition/findCompetitionRegistrations');
const addScheduleCompetition = require('../services/competition/scheduleCompetition');
const findScheduleCompetitions = require('../services/competition/findScheduleCompetition');
const updateScheduleCompetition = require('../services/competition/updateScheduleCompetiton');
const deleteScheduleCompetition = require('../services/competition/deleteScheduleCompetition');

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

        if (body.teamMembers && typeof body.teamMembers === 'string') {
            try {
                body.teamMembers = JSON.parse(body.teamMembers);
                if (!Array.isArray(body.teamMembers)) {
                    throw new Error('teamMembers must be an array');
                }
            } catch (error) {
                throw new BaseError({
                    status: StatusCodes.BAD_REQUEST,
                    message: 'Invalid JSON format for teamMembers or teamMembers is not an array',
                });
            }
        } else if (body.teamMembers === '') {
            body.teamMembers = [];
        }

        const result = await registerCompetitionPeserta(user.id, body, files);

        result.data.teamMembers = body.teamMembers;

        res.status(StatusCodes.CREATED).json(
            new BaseResponse({
                status: StatusCodes.CREATED,
                message: 'Berhasil mendaftarkan lomba',
                data: result.data
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
        const body = { ...req.body, search: req.query.search || req.body.search };
        const competition = await findCompetition(body, req.query);
        res.status(StatusCodes.OK).json(new DataTable(competition.data, competition.total));
    } catch (error) {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json(
            new BaseResponse({
                status: status,
                message: error.message
            })
        );
    }
};

const FindCompetitionRegistration = async (req, res) => {
    try {
        const body = { ...req.body, search: req.query.search || req.body.search };
        const competition = await findCompetitionRegistration(body, req.query);
        res.status(StatusCodes.OK).json(new DataTable(competition.data, competition.total));
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

const ScheduleCompetition = async (req, res) => {
    try {
        const { body } = req;
        const result = await addScheduleCompetition(body);
        res.status(StatusCodes.OK).json(
            new BaseResponse({
                status: StatusCodes.OK,
                message: 'Berhasil melakukan penjadwalan lomba',
                data: result
            })
        );
    } catch (error) {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json(
            new BaseResponse({
                status: status,
                message: error.message
            })
        );
    }
};

const FindScheduleCompetition = async (req, res) => {
    try {
        const body = { ...req.body, search: req.query.search || req.body.search };
        const schedule = await findScheduleCompetitions(body, req.query);
        res.status(StatusCodes.OK).json(new DataTable(schedule.data, schedule.total));
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

const UpdateScheduleCompetition = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const result = await updateScheduleCompetition(id, body);
        res.status(StatusCodes.OK).json(
            new BaseResponse({
                status: StatusCodes.OK,
                message: 'Berhasil mengubah jadwal lomba',
                data: result
            })
        );
    } catch (error) {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json(
            new BaseResponse({
                status: status,
                message: error.message
            })
        );
    }
}

const DeleteScheduleCompetition = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteScheduleCompetition(id);
        res.status(StatusCodes.OK).json(
            new BaseResponse({
                status: StatusCodes.OK,
                message: 'Berhasil menghapus jadwal lomba',
                data: result
            })
        );
    } catch (error) {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json(
            new BaseResponse({
                status: status,
                message: error.message
            })
        );
    }
}

module.exports = {
    RegisterCompetition,
    RegisterCompetitionPeserta,
    FindCompetition,
    FindCompetitionRegistration,
    ScheduleCompetition,
    FindScheduleCompetition,
    UpdateScheduleCompetition,
    DeleteScheduleCompetition
}