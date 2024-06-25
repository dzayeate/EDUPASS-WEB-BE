const { StatusCodes } = require('http-status-codes');
const BaseError = require('../../schemas/responses/BaseError');
const BaseResponse = require('../../schemas/responses/BaseResponse');
const { addToBlacklist } = require('../../utils/blacklist');

const Logout = async (req, res) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new BaseError({
                status: StatusCodes.BAD_REQUEST,
                message: 'Invalid authorization header'
            });
        }

        const token = authorization.split(' ')[1];

        addToBlacklist(token);

        return res.status(StatusCodes.OK).json(
            new BaseResponse({ 
                status: StatusCodes.OK, 
                message: 'Logout success' 
            })
        );
    } catch (error) {
        throw new BaseError({
            status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
}

module.exports = Logout;
