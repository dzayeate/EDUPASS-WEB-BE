const { Router } = require('express');
const {
  GetAllUsers,
  TestSponsor,
  TestMahasiswa,
  ChangePasswordUser
} = require('../controllers/user');
const ValidateAccess = require('../middlewares/access');
const AuthorizationCheck = require('../middlewares/auth');

const router = Router();

router.get('/getUser', [], GetAllUsers);
router.get('/sponsor', [ AuthorizationCheck, ValidateAccess ], TestSponsor);
router.get('/mahasiswa', [ AuthorizationCheck, ValidateAccess ], TestMahasiswa);
router.post('/change-password', [ AuthorizationCheck ], ChangePasswordUser);

module.exports = router;
