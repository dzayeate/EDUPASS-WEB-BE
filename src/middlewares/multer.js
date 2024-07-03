const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Direktori untuk menyimpan file
const userImageDir = path.join(__dirname, '../../public/images/users');
const proofDir = path.join(__dirname, '../../public/images/proofs');
const supportingDocumentDir = path.join(__dirname, '../../public/documents');

// Membuat direktori jika belum ada
[userImageDir, proofDir, supportingDocumentDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'image') {
            cb(null, userImageDir);
        } else if (file.fieldname === 'proof') {
            cb(null, proofDir);
        } else if (file.fieldname === 'supportingDocuments') {
            cb(null, supportingDocumentDir);
        } else {
            cb(new Error('Invalid field name'), false);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filter untuk file gambar dan dokumen
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'supportingDocuments') {
        cb(null, true); // Mendukung semua jenis file untuk dokumen pendukung
    } else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('File must be an image!'), false);
    }
};

// Konfigurasi multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Batasan ukuran file 5MB
    },
    fileFilter: fileFilter
});

module.exports = upload;
