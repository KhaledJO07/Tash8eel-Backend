// Server/routes/admin/workouts.js
const express = require('express');
const router = express.Router();

// Temporary route to avoid errors
router.get('/', (req, res) => {
  res.json({ message: 'Admin workouts route is working' });
});

module.exports = router;
