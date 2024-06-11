const { Router } = require('express');
const {
  RegisterUser,
  LoginUser
} = require('../controllers/auth');
const  upload = require('../services/Upload/multerConfigUser');

const router = Router();

router.post('/register', upload.single('image'), [], RegisterUser);
router.post('/login', [], LoginUser);


module.exports = router;
