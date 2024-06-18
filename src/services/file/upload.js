const fs = require('fs');
const path = require('path');

const upload = async (file) => {
    try {
        let uploadDir;
        if (file.fieldname === 'image') {
            uploadDir = path.join(__dirname, '../../public/images/users');
        } else if (file.fieldname === 'proof') {
            uploadDir = path.join(__dirname, '../../public/images/proofs');
        } else {
            console.error(`Invalid fieldname: ${file.fieldname}`);
            throw new Error('Invalid fieldname');
        }

        console.log(`Upload directory: ${uploadDir}`);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
            console.log(`Directory created: ${uploadDir}`);
        }

        const filePath = path.join(uploadDir, file.filename);
        fs.writeFileSync(filePath, file.buffer);
        console.log(`File saved to: ${filePath}`);
        return filePath;
    } catch (error) {
        console.error(`Error in upload service: ${error.message}`);
        throw error;
    }
};

module.exports = { upload };
