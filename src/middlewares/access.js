const { StatusCodes } = require("http-status-codes");
const access_list = require("../utils/access_list");
const BaseResponse = require("../schemas/responses/BaseResponse");
const BaseError = require("../schemas/responses/BaseError");

const validateAccess = async ( req, res, next) => {
    try{
        const PathRule = parseRequest(req);

        if(PathRule.length < 1) {
            throw new BaseError({
                status: StatusCodes.FORBIDDEN,
                message: `Path Rule not found`
            });
        }

        if(PathRule[0].allowed_role.indexOf(res?.locals?.user?.role) < 0){
            throw new BaseError({
                status: StatusCodes.FORBIDDEN,
                message: `You have not access to this endpoint`
            });
        }
        next();
    }catch(error){
        const status = error?.status || StatusCodes.INTERNAL_SERVER_ERROR;
        res
            .status(status)
            .json(new BaseResponse({ status: status, message: error.message }));
    }
}

const parseRequest = (req) => {
    if (!req) throw new Error(`Invalid Request`);

    const { originalUrl: path, method } = req;
    const parsedPath = String(path).split("?")[0];
    const pathData = access_list.filter(value => value.path == parsedPath && value.method == method);

    if (pathData.length === 0) {
        throw new BaseError({
            status: StatusCodes.NOT_FOUND,
            message: `Endpoint not found`,
        });
    }

    return pathData;
}

module.exports = validateAccess;
