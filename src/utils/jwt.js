const JWT = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const constant = require('./constant');
const BaseError = require('../schemas/responses/BaseError');

const getToken = (data) => {
  try {
    const Key = process.env.JWT_KEY || 'SSHSHHSHS_SECRET_KEY';
    const token = JWT.sign(data, Key, { expiresIn: constant.JWT_TOKEN_EXPIRED });
    return token;
  } catch (error) {
    throw new BaseError({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed create login token',
    });
  }
};

const FetchToken = (token) => {
  try {
    const fetchedData = JWT.decode(token);
    return fetchedData;
  } catch (error) {
    throw new BaseError({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed create login token',
    });
  }
};

module.exports = {
  getToken,
  FetchToken,
};
