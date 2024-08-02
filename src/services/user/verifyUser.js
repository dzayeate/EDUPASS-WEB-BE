const { User, Role } = require("../../models");
const schema = require("../../schemas/validations/user/verify-user");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../schemas/responses/BaseError");

const verifyUser = async (body) => {
    const { error, value } = schema.validate(body);
    if (error) {
      throw new BaseError({
        status: StatusCodes.BAD_REQUEST,
        message: error.message,
      });
    }
  
    try {
      const userId = value.userId;
      const user = await User.findByPk(userId);
      if (!user) {
        throw new BaseError({
          status: StatusCodes.NOT_FOUND,
          message: 'User not found',
        });
      }
  
      if (value.isApproved) {
        const requestedRoleId = await Role.getIdByName(user.requestedRole);
        if (!requestedRoleId) {
          throw new BaseError({
            status: StatusCodes.BAD_REQUEST,
            message: "Requested role not found",
          });
        }
  
        user.roleId = requestedRoleId;
        user.isVerified = true;
        user.requestedRole = null;
      } else {
        user.roleId = await Role.getIdByName('Umum');
        user.isVerified = false;
        user.requestedRole = null;
      }
  
      await user.save();
  
      return user;
    } catch (error) {
      throw new BaseError({
        status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal Server Error',
      });
    }
  };
  
  module.exports = verifyUser;