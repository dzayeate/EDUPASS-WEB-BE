const { Router } = require('express');
const {
  getAllUsers,
  getUserById
} = require('../controllers/user');

const router = Router();

router.get('/getUser', [], getAllUsers);
router.get('/getUserById/:id', [], getUserById);

module.exports = router;
