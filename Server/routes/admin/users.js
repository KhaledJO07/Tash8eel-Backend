// routes/admin/users.js
const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const User = require('../../models/User');

// GET /admin/users
router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// other admin-only user endpoints: delete, promote, etc.
module.exports = router;
