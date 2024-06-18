const { Router } = require('express');
const {
  RegisterUser,
  LoginUser
} = require('../controllers/auth');
const upload  = require('../middlewares/multer');

const router = Router();

router.post('/register', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'proof', maxCount: 1 }]), RegisterUser);
router.post('/login', [], LoginUser);

module.exports = router;
