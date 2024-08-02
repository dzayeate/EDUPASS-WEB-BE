const { StatusCodes } = require("http-status-codes");
const BaseError = require("../schemas/responses/BaseError");
const BaseResponse = require("../schemas/responses/BaseResponse");
const { FetchToken } = require("../utils/jwt");
const { isBlacklisted } = require("../utils/blacklist");

const authorizationCheck = async (req, res, next) => {
    const { authorization } = req.headers;
  
    try {
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new BaseError({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Invalid bearer token',
            });
        }

        const token = authorization.split(' ')[1];

        if (isBlacklisted(token)) {
            throw new BaseError({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Token has been logged out',
            });
        }

        const userObject = FetchToken(token);
        if (!userObject) {
            throw new BaseError({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Invalid bearer token',
            });
        }
        if (Date.now() < userObject.exp) {
            throw new BaseError({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Token Expired',
            });
        }
        
        res.locals.user = userObject;

        next();
    } catch (error) {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json(new BaseResponse({ status: status, message: error.message }));
    }
};

module.exports = authorizationCheck;
