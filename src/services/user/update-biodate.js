const { StatusCodes } = require('http-status-codes');
const schema = require('../../schemas/validations/user/update-biodate');
const BaseError = require('../../schemas/responses/BaseError');
const { Biodate, sequelize } = require("../../models");
const fs = require("fs");
const path = require("path");

const updateBiodata = async (id, body, files) => {
  const validateBody = schema.validate(body);
  if (validateBody.error) {
      throw new BaseError({
          status: StatusCodes.BAD_REQUEST,
          message: validateBody.error.message
      });
  }

  const { firstName, lastName, birthDate, gender, phone, address, province, regencies, institutionName, field, pupils } = validateBody.value;

  const validBirthDate = birthDate ? new Date(birthDate) : null;

  const transaction = await sequelize.transaction();

  try {
      const biodate = await Biodate.findByPk(id, { transaction });
      if (!biodate) {
          throw new BaseError({
              status: StatusCodes.NOT_FOUND,
              message: "Biodate not found",
          });
      }

      const imageFile = files && files['image'] ? files['image'][0] : null;
      const proofFile = files && files['proof'] ? files['proof'][0] : null;

      let imageFileName = biodate.image;
      if (imageFile) {
          imageFileName = imageFile.filename;
          if (biodate.image) {
              const oldImageFilePath = path.join(__dirname, '../../../public/images/users', biodate.image);
              if (fs.existsSync(oldImageFilePath)) {
                  fs.unlinkSync(oldImageFilePath);
              }
          }
      }

      let proofFileName = biodate.proof;
      if (proofFile) {
          proofFileName = proofFile.filename;
          if (biodate.proof) {
              const oldProofFilePath = path.join(__dirname, '../../../public/images/proofs', biodate.proof);
              if (fs.existsSync(oldProofFilePath)) {
                  fs.unlinkSync(oldProofFilePath);
              }
          }
      }

      await biodate.update({
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
          proof: proofFileName,
      }, { transaction });

      await transaction.commit();

      return biodate;
  } catch (error) {
      await transaction.rollback();
      if (files) {
          const imageFile = files['image'] ? files['image'][0] : null;
          const proofFile = files['proof'] ? files['proof'][0] : null;

          if (imageFile && imageFile.filename) {
              const imageFilePath = path.join(__dirname, '../../../public/images/users', imageFile.filename);
              if (fs.existsSync(imageFilePath)) {
                  fs.unlinkSync(imageFilePath);
              }
          }

          if (proofFile && proofFile.filename) {
              const proofFilePath = path.join(__dirname, '../../../public/images/proofs', proofFile.filename);
              if (fs.existsSync(proofFilePath)) {
                  fs.unlinkSync(proofFilePath);
              }
          }
      }

      throw error;
  }
};

module.exports = updateBiodata;
