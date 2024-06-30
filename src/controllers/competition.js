const { StatusCodes } = require('http-status-codes');
const BaseResponse = require('../schemas/responses/BaseResponse');
const BaseError = require('../schemas/responses/BaseError');
const registerCompetition = require('../services/competition/register');



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


module.exports = {
 RegisterCompetition   
}