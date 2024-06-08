const express = require('express');

const router = express.Router();
const AuthRouter = require('./auth');

router.get('/', (req, res) => {
  res.json({
    version: '3.9.0',
  });
});

router.use('/auth', AuthRouter);

module.exports = router;
