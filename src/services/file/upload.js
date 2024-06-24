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
            throw new Error('Invalid fieldname');
        }

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, file.filename);
        fs.writeFileSync(filePath, file.buffer);
        return filePath;
    } catch (error) {
        throw error;
    }
};

module.exports = { upload };
