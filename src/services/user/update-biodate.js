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

    let oldImageFilePath, oldProofFilePath;

    if (imageFile) {
      const imageFileName = imageFile.filename;
      if (biodate.image) {
        const oldImageFileName = biodate.getDataValue('image'); // Pastikan hanya nama file yang diambil
        oldImageFilePath = path.join(__dirname, '../../../public/images/users', oldImageFileName);
        console.log(`Jalur file gambar lama: ${oldImageFilePath}`);
      }
      biodate.image = imageFileName;
    }

    if (proofFile) {
      const proofFileName = proofFile.filename;
      if (biodate.proof) {
        const oldProofFileName = biodate.getDataValue('proof'); // Pastikan hanya nama file yang diambil
        oldProofFilePath = path.join(__dirname, '../../../public/images/proofs', oldProofFileName);
        console.log(`Jalur file bukti lama: ${oldProofFilePath}`);
      }
      biodate.proof = proofFileName;
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
      institutionName,
      field,
      pupils,
      image: biodate.image,
      proof: biodate.proof,
    }, { transaction });

    await transaction.commit();

    // Hapus file lama setelah transaksi berhasil
    if (oldImageFilePath && fs.existsSync(oldImageFilePath)) {
      console.log(`Menghapus file gambar lama: ${oldImageFilePath}`);
      fs.unlinkSync(oldImageFilePath);
    } else {
      console.log(`File gambar lama tidak ditemukan: ${oldImageFilePath}`);
    }

    if (oldProofFilePath && fs.existsSync(oldProofFilePath)) {
      console.log(`Menghapus file bukti lama: ${oldProofFilePath}`);
      fs.unlinkSync(oldProofFilePath);
    } else {
      console.log(`File bukti lama tidak ditemukan: ${oldProofFilePath}`);
    }

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
