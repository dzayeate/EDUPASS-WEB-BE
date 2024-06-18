const fs = require('fs');
const path = require('path');

const directories = {
  'image': path.join(__dirname, '../../../public/images/users'),
  'proof': path.join(__dirname, '../../../public/images/proofs')
};

const download = async (fieldName, fileName) => {
  try {
    const directory = directories[fieldName];
    if (!directory) {
      console.error(`Invalid fieldName: ${fieldName}`);
      throw new Error('Invalid fieldName');
    }

    const filePath = path.join(directory, fileName);

    console.log(`File path resolved: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      throw new Error('File not found');
    }

    const fileContent = fs.readFileSync(filePath);
    console.log(`File read successfully: ${filePath}`);
    return fileContent;
  } catch (error) {
    console.error(`Error in download service: ${error.message}`);
    throw error;
  }
};

module.exports = { download };
