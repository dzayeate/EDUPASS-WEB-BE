const { User, Role } = require("../../models");
const schema = require("../../schemas/validations/auth/register");
const { StatusCodes } = require("http-status-codes");
const { encryptPassword } = require("../../utils/hash");
const BaseError = require("../../schemas/responses/BaseError");

const Register = async(body) => {
  const validateBody = schema.validate(body);
  if(validateBody.error) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: validateBody.error.details.map(err => err.message).join(', '),
    });
  }

  const { email, password, confirmPassword } = validateBody.value;

  if(password !== confirmPassword) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: "Passwords do not match",
    });
  }

  const hashedPassword = await encryptPassword(password);
  const defaultRole = await Role.getIdByName('Siswa');

  const user = await User.create({
    email,
    password: hashedPassword,
    roleId: defaultRole.id,
  })

  return user;
}

module.exports = Register;
