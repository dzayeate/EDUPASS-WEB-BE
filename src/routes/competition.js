const { Router } = require('express');
const {
    RegisterCompetition,
    RegisterCompetitionEO,
    FindCompetition
} = require('../controllers/competition');
const upload  = require('../middlewares/multer');
const ValidateAccess = require('../middlewares/access');
const AuthorizationCheck = require('../middlewares/auth');

const router = Router();

router.post('/register', upload.fields([{ name: 'image', maxCount: 1 }]),[ AuthorizationCheck ], RegisterCompetition);
router.post('/register-competition-eo', upload.fields([{ name: 'supportingDocuments', maxCount: 1 }]),[ AuthorizationCheck, ValidateAccess ], RegisterCompetitionEO);
router.get('/findCompetition', [], FindCompetition);

module.exports = router;
