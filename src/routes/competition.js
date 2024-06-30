const { Router } = require('express');
const {
    RegisterCompetition
} = require('../controllers/competition');
const upload  = require('../middlewares/multer');
const ValidateAccess = require('../middlewares/access');
const AuthorizationCheck = require('../middlewares/auth');

const router = Router();

router.post('/register', upload.fields([{ name: 'image', maxCount: 1 }]),[ AuthorizationCheck ], RegisterCompetition);




module.exports = router;
