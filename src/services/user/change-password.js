const schema = require('../../schemas/validations/user/change-password');
const BaseError = require('../../schemas/responses/BaseError');
const { StatusCodes } = require('http-status-codes');
const { isValidUser } = require('../../utils/validate_user');
const { comparePassword, encryptPassword } = require('../../utils/hash');
const { User, sequelize } = require('../../models');

const ChangePassword = async (body, user) => {
  const { error, value } = schema.validate(body);
  if (error) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: error.message
    });
  }

  const transaction = await sequelize.transaction();
  try {
    const { oldPassword, newPassword, confirmPassword } = value;

    validateNewPassword(newPassword, confirmPassword);

    const userData = await isValidUser(user.id, transaction);

    await validateOldPassword(oldPassword, userData.password);

    await User.update({
      password: await encryptPassword(newPassword)
    }, {
      where: { id: userData.id },
      transaction: transaction
    });

    await transaction.commit();

    return {
      status: StatusCodes.OK,
      message: 'Password updated'
    };
  } catch (error) {
    await transaction.rollback();
    const status = error?.status || StatusCodes.INTERNAL_SERVER_ERROR;
    throw new BaseError({
      status: status,
      message: error.message,
    });
  }
};

const validateOldPassword = async (oldPasswordPlainText, oldPasswordHashed) => {
  const isValidPassword = await comparePassword(oldPasswordPlainText, oldPasswordHashed);
  if (!isValidPassword) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: 'Password lama tidak valid'
    });
  }
};

const validateNewPassword = (newPassword, confirmPassword) => {
  if (newPassword !== confirmPassword) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: 'Password baru tidak sama'
    });
  }
};

module.exports = ChangePassword;
