const { Op } = require("sequelize");
const { User } = require("../models");
const BaseError = require("../schemas/responses/BaseError");
const { StatusCodes } = require("http-status-codes");

const isValidUserLogin = async (email) => {
  const userData = await User.findOne({
    where: {
      email
    },
  });
  if (!userData) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: `User tidak ditemukan`,
    });
  }

  return userData.dataValues;
};

const isValidUser = async (id) => {
  const isUserExists = await User.findOne({
    where: { id }
  });
  if (!isUserExists) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: `User tidak ditemukan`,
    });
  }
  return isUserExists.dataValues;
};


module.exports = {
  isValidUserLogin,
  isValidUser,
};
