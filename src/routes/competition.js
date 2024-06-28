const { Router } = require('express');
const {
    ChangeRoleUser
} = require('../controllers/competition');
const upload  = require('../middlewares/multer');
const ValidateAccess = require('../middlewares/access');
const AuthorizationCheck = require('../middlewares/auth');

const router = Router();



module.exports = router;
