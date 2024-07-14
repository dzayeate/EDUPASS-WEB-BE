const { Router } = require('express');
const {
    RegisterCompetition,
    RegisterCompetitionPeserta,
    FindCompetition,
    FindCompetitionRegistration,
    ScheduleCompetition,
    FindScheduleCompetition,
    UpdateScheduleCompetition,
    DeleteScheduleCompetition
} = require('../controllers/competition');
const upload  = require('../middlewares/multer');
const ValidateAccess = require('../middlewares/access');
const AuthorizationCheck = require('../middlewares/auth');

const router = Router();

router.get('/findCompetition', [], FindCompetition);
router.get('/findCompetitionRegistration', [ AuthorizationCheck, ValidateAccess ], FindCompetitionRegistration);
router.get('/findScheduleCompetition', [], FindScheduleCompetition);

router.post('/register', upload.fields([{ name: 'image', maxCount: 1 }]),[ AuthorizationCheck ], RegisterCompetition);
router.post('/register/peserta', upload.fields([{ name: 'supportingDocuments', maxCount: 1 }]),[ AuthorizationCheck, ValidateAccess ], RegisterCompetitionPeserta);
router.post('/schedule', [ AuthorizationCheck, ValidateAccess ], ScheduleCompetition);

router.put('/updateScheduleCompetition/:id', [ AuthorizationCheck, ValidateAccess ], UpdateScheduleCompetition);

router.delete('/deleteScheduleCompetition/:id', [ AuthorizationCheck, ValidateAccess ], DeleteScheduleCompetition);

module.exports = router;
