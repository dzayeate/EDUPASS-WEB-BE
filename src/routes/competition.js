const { Router } = require('express');
const {
    RegisterCompetition,
    RegisterCompetitionPeserta,
    FindCompetition,
    FindCompetitionRegistration,
    ScheduleCompetition
} = require('../controllers/competition');
const upload  = require('../middlewares/multer');
const ValidateAccess = require('../middlewares/access');
const AuthorizationCheck = require('../middlewares/auth');

const router = Router();

router.post('/register', upload.fields([{ name: 'image', maxCount: 1 }]),[ AuthorizationCheck ], RegisterCompetition);
router.post('/register/peserta', upload.fields([{ name: 'supportingDocuments', maxCount: 1 }]),[ AuthorizationCheck, ValidateAccess ], RegisterCompetitionPeserta);

router.post('/schedule', [], ScheduleCompetition);
router.get('/findCompetition', [], FindCompetition);
router.get('/findCompetitionRegistration', [], FindCompetitionRegistration);

module.exports = router;
