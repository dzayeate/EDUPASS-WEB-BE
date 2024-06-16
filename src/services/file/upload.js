const fs = require('fs');
const path = require('path');

const upload = async (file) => {
    try {
        const uploadDir = path.join(__dirname, '../../public/images/users');
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
