const express = require('express');

const router = express.Router();
const AuthRouter = require('./auth');
const UserRouter = require('./user');

router.get('/', (req, res) => {
  res.json({
    version: '3.9.0',
  });
});

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);

module.exports = router;
