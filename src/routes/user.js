const { Router } = require('express');
const {
  GetAllUsers,
  ChangePasswordUser,
  ForgotPassword,
  ResetPassword,
} = require('../controllers/user');
const ValidateAccess = require('../middlewares/access');
const AuthorizationCheck = require('../middlewares/auth');

const router = Router();

router.get('/getUser', [], GetAllUsers);
router.post('/change-password', [ AuthorizationCheck ], ChangePasswordUser);
router.post('/forgot-password', [], ForgotPassword);

router.get('/reset-password/:token', [], ResetPassword);

module.exports = router;
