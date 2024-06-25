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
  console.log(`Validation - isValidUser called with id: ${id}`);
  const isUserExists = await User.findOne({
    where: { id }
  });
  if (!isUserExists) {
    console.log(`Validation - User not found with id: ${id}`);
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: `User tidak ditemukan`,
    });
  }
  console.log(`Validation - User found with id: ${id}`);
  return isUserExists.dataValues;
};


module.exports = {
  isValidUserLogin,
  isValidUser,
};
