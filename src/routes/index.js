const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    version: '3.9.0',
  });
});

module.exports = router;
