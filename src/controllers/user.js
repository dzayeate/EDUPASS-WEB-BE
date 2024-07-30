const { StatusCodes } = require('http-status-codes');
const BaseResponse = require('../schemas/responses/BaseResponse');
const DataTable = require('../schemas/responses/DataTable');
const FindUsers = require('../services/user/findUser');
const ChangePassword = require('../services/user/change-password');
const forgotPass = require('../services/user/forgot-password');
const resetPassword = require('../services/user/reset-password');
const updateBiodata = require('../services/user/update-biodate');
const DeleteUser = require('../services/user/delete-user');
const ChangeRole = require('../services/user/change-role');
const verifyUser = require('../services/user/verifyUser');

const GetAllUsers = async (req, res) => {
  try {
    const body = { ...req.body, search: req.query.search || req.body.search };
    const users = await FindUsers(body, req.query);
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
      );
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

const UpdateBiodateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedBiodata = await updateBiodata(id, req.body, req.files);

    res.status(StatusCodes.OK).json(new BaseResponse({
      status: StatusCodes.OK,
      message: 'Biodata berhasil diubah',
      data: updatedBiodata
    }));
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(new BaseResponse({
      status: status,
      message: error.message
    }));
  }
};

const DeleteUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const result = await DeleteUser(userId);

    res.status(StatusCodes.OK).json(
      new BaseResponse({
        status: StatusCodes.OK,
        message: result.message,
      })
    );
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(new BaseResponse({
      status: status,
      message: error.message
    }));
  }
};

const ChangeRoleUser = async (req, res) => {
  try {
      const user = res.locals.user;

      if (!user) {
          throw new BaseError({
              status: StatusCodes.UNAUTHORIZED,
              message: 'User is not authenticated',
          });
      }

      const updatedUser = await ChangeRole(user.id, req.body);
      res.status(StatusCodes.OK).json(new BaseResponse({
          status: StatusCodes.OK,
          message: 'Role berhasil diubah',
          data: updatedUser
      }));
  } catch (error) {
      res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json(new BaseResponse({
          status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message
      }));
  }
};

const VerifyUser = async (req, res) => {
  try {
    const verify = await verifyUser(req.body);
    res.status(StatusCodes.OK).json(new BaseResponse({
      status: StatusCodes.OK,
      message: 'User berhasil diverifikasi',
      data: verify
    }));
  } catch (error) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json(new BaseResponse({
      status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    }));
  }
};

module.exports = {
  GetAllUsers,
  ChangePasswordUser,
  ForgotPassword,
  ResetPassword,
  UpdateBiodateUser,
  DeleteUsers,
  ChangeRoleUser,
  VerifyUser
}
