const { StatusCodes } = require('http-status-codes');
const schema = require('../../schemas/validations/auth/login');
const { comparePassword } = require('../../utils/hash');
const BaseError = require('../../schemas/responses/BaseError');
const { getToken } = require('../../utils/jwt');
const { isValidUserLogin } = require('../../utils/validate_user');

const Login = async (body) => {
  const validateBody = schema.validate(body);
  if (validateBody.error) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: validateBody.error.message,
    });
  }

  const { email, password } = validateBody.value;
  const userData = await isValidUserLogin(email);

  const isPasswordMatch = await comparePassword(password, userData.password);
  if (!isPasswordMatch) {
    throw new BaseError({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Password salah',
    });
  }

  delete userData.password;
  return {
    ...userData,
    token: getToken({ ...userData, roleName: userData.roleName }),
  };
};

module.exports = Login;
