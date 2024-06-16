const fs = require('fs');
const path = require('path');

const download = async (fileName) => {
  try {
    const filePath = path.join(__dirname, '../../../public/images/users', fileName);

    // Periksa apakah file ada
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    // Membaca file dan mengembalikan kontennya
    const fileContent = fs.readFileSync(filePath);
    return fileContent;
  } catch (error) {
    throw error;
  }
};

module.exports = { download };
