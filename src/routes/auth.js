const { Router } = require('express');
const {
  RegisterUser,
  LoginUser
} = require('../controllers/auth');

const router = Router();

router.post('/register', [], RegisterUser);
router.post('/login', [], LoginUser);


module.exports = router;
