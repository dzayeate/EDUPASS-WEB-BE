const { StatusCodes } = require('http-status-codes');
const BaseResponse = require('../schemas/responses/BaseResponse');
const { User, Role } = require('../models');
const Register = require('../services/auth/register');
const Login = require('../services/auth/login');
const BaseError = require('../schemas/responses/BaseError');

const RegisterUser = async (req, res) => {
  try {
    res.status(StatusCodes.CREATED).json(
      new BaseResponse({
        status: StatusCodes.CREATED,
        message: 'Berhasil membuat user baru',
        data: await Register(req.body)
      })
    )
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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      ],
      attributes: ['id', 'email']
    });

    res.status(StatusCodes.OK).json(
      new BaseResponse({
        status: StatusCodes.OK,
        message: 'Berhasil mendapatkan data user',
        data: users
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

module.exports = {
  RegisterUser,
  LoginUser,
  getAllUsers
}
