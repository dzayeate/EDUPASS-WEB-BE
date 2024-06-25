const { Router } = require('express');
const {
  RegisterUser,
  LoginUser,
  LogoutUser
} = require('../controllers/auth');
const upload  = require('../middlewares/multer');
const AuthorizationCheck = require('../middlewares/auth');

const router = Router();

router.post('/register', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'proof', maxCount: 1 }]), RegisterUser);
router.post('/login', [], LoginUser);
router.post('/logout', [ AuthorizationCheck ], LogoutUser);

module.exports = router;
