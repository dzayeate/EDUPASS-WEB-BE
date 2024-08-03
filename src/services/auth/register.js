const { User, Role, sequelize, Biodate } = require("../../models");
const schema = require("../../schemas/validations/auth/register");
const { StatusCodes } = require("http-status-codes");
const { encryptPassword } = require("../../utils/hash");
const BaseError = require("../../schemas/responses/BaseError");
const fs = require("fs");
const path = require("path");

const Register = async (body, files) => {
  if (!body.roleName || body.roleName.trim() === '') {
    body.roleName = 'Umum';
  }

  const validateBody = schema.validate(body);

  if (validateBody.error) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: validateBody.error.details[0].message,
    });
  }

  const {
    email,
    password,
    confirmPassword,
    roleName,
    firstName,
    lastName,
    birthDate,
    gender,
    phone,
    address,
    province,
    regencies,
    institutionName,
    field,
    pupils
  } = validateBody.value;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: "Email sudah terdaftar",
    });
  }

  const validBirthDate = birthDate ? new Date(birthDate) : null;

  if (password !== confirmPassword) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: "Passwords do not match",
    });
  }

  const hashedPassword = await encryptPassword(password);

  const transaction = await sequelize.transaction();

  try {
    const defaultRoleId = await Role.getIdByName('Umum');
    const requestedRoleId = await Role.getIdByName(roleName);

    if (!requestedRoleId) {
      throw new BaseError({
        status: StatusCodes.BAD_REQUEST,
        message: "Invalid role name",
      });
    }

    const imageFile = files && files['image'] ? files['image'][0] : null;
    const proofFile = files && files['proof'] ? files['proof'][0] : null;

    const imageFileName = imageFile ? imageFile.filename : null;
    const proofFileName = proofFile ? proofFile.filename : null;

    const biodate = await Biodate.create(
      {
        firstName,
        lastName,
        birthDate: validBirthDate,
        gender,
        phone,
        address,
        province,
        regencies,
        image: imageFileName,
        institutionName,
        field,
        pupils,
        proof: proofFileName
      },
      { transaction }
    );

    const user = await User.create(
      {
        email,
        password: hashedPassword,
        roleId: roleName === 'Umum' ? defaultRoleId : requestedRoleId,
        biodateId: biodate.id,
        requestedRole: roleName !== 'Umum' ? roleName : null,
        isVerified: roleName === 'Umum'
      },
      { transaction }
    );

    await transaction.commit();

    return user;
  } catch (error) {
    await transaction.rollback();
    if (files) {
      const imageFile = files['image'] ? files['image'][0] : null;
      const proofFile = files['proof'] ? files['proof'][0] : null;

      if (imageFile && imageFile.filename) {
        const imageFilePath = path.join(__dirname, '../../../public/images/users', imageFile.filename);
        fs.unlinkSync(imageFilePath);
      }

      if (proofFile && proofFile.filename) {
        const proofFilePath = path.join(__dirname, '../../../public/images/proofs', proofFile.filename);
        fs.unlinkSync(proofFilePath);
      }
    }

    throw error;
  }
}

module.exports = Register;
