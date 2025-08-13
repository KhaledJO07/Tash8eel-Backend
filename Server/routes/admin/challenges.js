// Server/routes/admin/challenges.js
const express = require('express');
const router = express.Router();

// Temporary test route
router.get('/', (req, res) => {
  res.json({ message: 'Admin challenges route is working' });
});

module.exports = router;
