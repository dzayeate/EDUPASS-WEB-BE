const { Router } = require('express');
const {
    RegisterCompetition,
    RegisterCompetitonPeserta,
    FindCompetition,
    FindCompetitionRegistration
} = require('../controllers/competition');
const upload  = require('../middlewares/multer');
const ValidateAccess = require('../middlewares/access');
const AuthorizationCheck = require('../middlewares/auth');

const router = Router();

router.post('/register', upload.fields([{ name: 'image', maxCount: 1 }]),[ AuthorizationCheck ], RegisterCompetition);
router.post('/register/competition', upload.fields([{ name: 'supportingDocuments', maxCount: 1 }]),[ AuthorizationCheck, ValidateAccess ], RegisterCompetitonPeserta);
router.get('/findCompetition', [AuthorizationCheck, ValidateAccess], FindCompetition);
router.get('/findCompetitionRegistration', [], FindCompetitionRegistration);

module.exports = router;
