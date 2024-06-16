// controllers/file.js
const BaseResponse = require("../schemas/responses/BaseResponse");
const downloadService = require("../services/file/download");
const uploadService = require("../services/file/upload");
const { StatusCodes } = require('http-status-codes');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const result = await uploadService.upload(req.file);
    res.status(StatusCodes.OK).json(new BaseResponse({
      status: StatusCodes.OK,
      message: 'Berhasil',
      data: result
    }));
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(
      new BaseResponse({
        status: status,
        message: error.message
      })
    );
  }
}

const downloadFile = async (req, res) => {
  try {
    const { url: fileName } = req.query;  // Menggunakan query parameter

    if (!fileName) {
      throw new Error('No file name specified');
    }

    const fileContent = await downloadService.download(fileName);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.status(StatusCodes.OK).send(fileContent);
  } catch (error) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json(
      new BaseResponse({
        status: status,
        message: error.message
      })
    );
  }
};

module.exports = {
  uploadFile,
  downloadFile
};
