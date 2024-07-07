const { StatusCodes } = require('http-status-codes');
const BaseResponse = require('../schemas/responses/BaseResponse');
const Register = require('../services/auth/register');
const Login = require('../services/auth/login');
const Logout = require('../services/auth/logout');

const RegisterUser = async (req, res) => {
  try {
    const { body, files } = req;
    const result = await Register(body, files);

    res.status(StatusCodes.CREATED).json(
      new BaseResponse({
        status: StatusCodes.CREATED,
        message: 'Berhasil membuat user baru',
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

const LoginUser = async (req, res) => {
  try {
    const token = await Login(req.body);
    res.status(StatusCodes.OK).json(
      new BaseResponse({
        status: StatusCodes.OK,
        message: 'Berhasil login',
        data: token
      })
    );
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

const LogoutUser = async (req, res) => {
  try {
    await Logout(req, res);
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

module.exports = {
  RegisterUser,
  LoginUser,
  LogoutUser
}
