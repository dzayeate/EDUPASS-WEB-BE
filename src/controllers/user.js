const { StatusCodes } = require('http-status-codes');
const BaseResponse = require('../schemas/responses/BaseResponse');
const DataTable = require('../schemas/responses/DataTable');
const FindUsers = require('../services/user/findUser');
const ChangePassword = require('../services/user/change-password');
const forgotPass = require('../services/user/forgot-password');
const resetPassword = require('../services/user/reset-password');

const GetAllUsers = async (req, res) => {
  try {
    const users = await FindUsers(req.query);
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

const ChangePasswordUser = async (req, res) => {
  try {
    await ChangePassword(req.body, res.locals.user);
    res.status(StatusCodes.OK).json(new BaseResponse({
      status: StatusCodes.OK,
      message: 'Password berhasil diubah'
    }));
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(new BaseResponse({
      status: status,
      message: error.message
    }));
  }
}

const ForgotPassword = async (req, res) => {
  try {
    await forgotPass(req.body);
    res.status(StatusCodes.OK).json(new BaseResponse({
      status: StatusCodes.OK,
      message: 'Email berhasil dikirim'
    }));
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(new BaseResponse({
      status: status,
      message: error.message
    }));
  }
}

const ResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      throw new Error('Token is missing');
    }
    const result = await resetPassword(token);
    res.status(StatusCodes.OK).json(new BaseResponse({
      status: StatusCodes.OK,
      message: 'Token Validation Success',
      data: result
    }));
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(new BaseResponse({
      status: status,
      message: error.message
    }));
  }
}

module.exports = {
  GetAllUsers,
  ChangePasswordUser,
  ForgotPassword,
  ResetPassword,
}
