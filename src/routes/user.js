const { Router } = require('express');
const {
  GetAllUsers,
  TestSponsor,
  TestMahasiswa
} = require('../controllers/user');
const ValidateAccess = require('../middlewares/access');
const AuthorizationCheck = require('../middlewares/auth');

const router = Router();

router.get('/getUser', [], GetAllUsers);
router.get('/sponsor', [ AuthorizationCheck, ValidateAccess ], TestSponsor);
router.get('/mahasiswa', [ AuthorizationCheck, ValidateAccess ], TestMahasiswa);

module.exports = router;
