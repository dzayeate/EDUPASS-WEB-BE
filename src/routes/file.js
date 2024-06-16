const { Router } = require('express');
const { uploadFile, downloadFile } = require('../controllers/file');

const router = Router();

router.post('/upload', [], uploadFile);
router.get('/download', [], downloadFile);

module.exports = router;
