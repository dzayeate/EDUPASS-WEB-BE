const fs = require('fs');
const path = require('path');

const directories = {
  'image': path.join(__dirname, '../../../public/images/users'),
  'banner': path.join(__dirname, '../../../public/images/banners'),
};

const preview = async (fieldName, fileName) => {
  try {
    const directory = directories[fieldName];
    if (!directory) {
      throw new Error('Invalid fieldName');
    }

    const filePath = path.join(directory, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    const fileContent = fs.readFileSync(filePath);
    
    return { fileContent, filePath };
  } catch (error) {
    throw error;
  }
};

module.exports = { preview };
