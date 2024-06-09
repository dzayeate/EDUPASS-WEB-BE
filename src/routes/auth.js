const { Router } = require('express');
const {
  RegisterUser,
  getAllUsers,
  LoginUser
} = require('../controllers/user');

const router = Router();

router.post('/register', [], RegisterUser);
router.post('/login', [], LoginUser);
router.get('/getUser', [], getAllUsers);

module.exports = router;
