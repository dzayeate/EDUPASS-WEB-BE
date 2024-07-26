const { Router } = require('express');
const { uploadFile, downloadFile, previewFile } = require('../controllers/file');

const router = Router();

router.post('/upload', [], uploadFile);
router.get('/download', [], downloadFile);
router.get('/preview', [], previewFile);

module.exports = router;
