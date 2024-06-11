const { User, Role, sequelize, Biodate } = require("../../models");
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

  const {
    email,
    password,
    confirmPassword,
    roleName,
    firstName,
    lastName,
    nik,
    institutionName,
    institutionLevel,
    province,
    regencies,
    studyField,
    reason,
    image } = validateBody.value;

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

    if (!role) {
      throw new BaseError({
        status: StatusCodes.BAD_REQUEST,
        message: "Invalid role name",
      });
    }
    //cek apakah nik sudah ada 
    const isNikExists = await User.findOne({
      include: [{
        model: Biodate,
        as: "biodate"
      }],
      where: { "$biodate.nik$": nik },
      transaction,
    });
    
    if (isNikExists) {
      throw new BaseError({
        status: StatusCodes.BAD_REQUEST,
        message: "Nik sudah terdaftar",
      });
    }
    const roleId = role.id;
    const biodate = await Biodate.create(
      {
        firstName,
        lastName,
        nik,
        institutionName,
        institutionLevel,
        province,
        regencies,
        studyField,
        reason,
        image,
      },
      { transaction}
    );
    const user = await User.create(
      {
        email,
        password: hashedPassword,
        roleId,
        biodateId: biodate.id,
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
