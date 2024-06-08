const { Router } = require('express');
const {
  RegisterUser
} = require('../controllers/user');

const router = Router();

router.post('/register', [], RegisterUser);

module.exports = router;
