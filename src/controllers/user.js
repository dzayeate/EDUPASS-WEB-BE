const { StatusCodes } = require('http-status-codes');
const BaseResponse = require('../schemas/responses/BaseResponse');
const DataTable = require('../schemas/responses/DataTable');
const Register = require('../services/auth/register');
const Login = require('../services/auth/login');
const FindUsers = require('../services/user/findUser');
const { sponsor, mahasiswa } = require('../services/user/test');

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

const TestSponsor = async (req, res) => {
  try {
    const data = await sponsor(req.body);
    res.status(StatusCodes.OK).json(new BaseResponse({
      status: StatusCodes.OK,
      message: 'Berhasil',
      data: data
    }));
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

const TestMahasiswa = async (req, res) => {
  try {
    const data = await mahasiswa(req.body);
    res.status(StatusCodes.OK).json(new BaseResponse({
      status: StatusCodes.OK,
      message: 'Berhasil',
      data: data
    }));
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
  RegisterUser,
  LoginUser,
  GetAllUsers,
  TestSponsor,
  TestMahasiswa
}
