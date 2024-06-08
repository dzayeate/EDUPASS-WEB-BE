const { StatusCodes } = require('http-status-codes');
const BaseResponse = require('../schemas/responses/BaseResponse');
const Register = require('../services/auth/register');
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
        new BaseError({
          status: status,
          message: error.message
        })
      )
  }
}

module.exports = {
  RegisterUser
}
