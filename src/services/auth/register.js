const { User, Role, sequelize } = require("../../models");
const schema = require("../../schemas/validations/auth/register");
const { StatusCodes } = require("http-status-codes");
const { encryptPassword } = require("../../utils/hash");
const BaseError = require("../../schemas/responses/BaseError");

const Register = async (body) => {
  const validateBody = schema.validate(body);
  if (validateBody.error) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: validateBody.error.details.map((err) => err.message).join(", "),
    });
  }

  const { email, password, confirmPassword, roleName } = validateBody.value;

  if (password !== confirmPassword) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: "Passwords do not match",
    });
  }

  const hashedPassword = await encryptPassword(password);

  const transaction = await sequelize.transaction();

  try {
    const role = await Role.getIdByName(roleName);
    
    console.log(`role: ${JSON.stringify(role)}`);

    if (!role) {
      throw new BaseError({
        status: StatusCodes.BAD_REQUEST,
        message: "Invalid role name",
      });
    }
    const roleId = role.id;

    const user = await User.create(
      {
        email,
        password: hashedPassword,
        roleId,
      },
      { transaction }
    );

    await transaction.commit();

    return user;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = Register;
