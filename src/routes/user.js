const { Router } = require('express');
const {
  GetAllUsers,
  ChangePasswordUser,
  ForgotPassword,
  ResetPassword,
  UpdateBiodateUser,
  DeleteUsers,
  sponsor
} = require('../controllers/user');
const ValidateAccess = require('../middlewares/access');
const AuthorizationCheck = require('../middlewares/auth');
const upload  = require('../middlewares/multer');

const router = Router();

router.get('/getUser', [], GetAllUsers);
router.post('/change-password', [ AuthorizationCheck ], ChangePasswordUser);
router.post('/forgot-password', [], ForgotPassword);
router.get('/reset-password/:token', [], ResetPassword);
router.put('/update-biodate', [ AuthorizationCheck, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'proof', maxCount: 1 }])], UpdateBiodateUser);
router.delete('/delete-user/:userId', [ AuthorizationCheck, ValidateAccess ], DeleteUsers);

router.get('/sponsor', [AuthorizationCheck, ValidateAccess], sponsor);

module.exports = router;
