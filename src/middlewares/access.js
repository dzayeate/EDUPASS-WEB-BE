const { StatusCodes } = require("http-status-codes");
const access_list = require("../utils/access_list");
const BaseResponse = require("../schemas/responses/BaseResponse");
const BaseError = require("../schemas/responses/BaseError");
const { Role } = require("../models");
const { match } = require("path-to-regexp");

const validateAccess = async (req, res, next) => {
  try {
    if (!res.locals.user || !res.locals.user.isVerified) {
      throw new BaseError({
        status: StatusCodes.FORBIDDEN,
        message: 'User is not verified. Access denied.',
      });
    }
    const PathRule = parseRequest(req);

    if (PathRule.length < 1) {
      throw new BaseError({
        status: StatusCodes.FORBIDDEN,
        message: `Path Rule not found`,
      });
    }

    const userRoleName = await extractRoleNameFromRoleId(res.locals.user.roleId);

    if (!PathRule[0].allowed_role.includes(userRoleName)) {
      throw new BaseError({
        status: StatusCodes.FORBIDDEN,
        message: `You have not access to this endpoint. Expected role: ${PathRule[0].allowed_role[0]}`,
      });
    }

    next();
  } catch (error) {
    const status = error?.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res
      .status(status)
      .json(new BaseResponse({ status: status, message: error.message }));
  }
};

const parseRequest = (req) => {
  if (!req) throw new Error(`Invalid Request`);

  const { originalUrl: path, method } = req;
  const parsedPath = String(path).split("?")[0];

  const pathData = access_list.filter(value => {
    const matched = match(value.path, { decode: decodeURIComponent })(parsedPath);
    return matched && value.method === method;
  });

  if (pathData.length === 0) {
    throw new BaseError({
      status: StatusCodes.NOT_FOUND,
      message: `Endpoint not found`,
    });
  }

  return pathData;
};

const extractRoleNameFromRoleId = async (roleId) => {
  const role = await Role.findByPk(roleId);
  if (!role) return "Unknown";
  return role.name;
};

module.exports = validateAccess;
