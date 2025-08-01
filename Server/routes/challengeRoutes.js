// routes/challengeRoutes.js
const express = require('express');
const router = express.Router();
const Challenge     = require('../models/Challenge');
const UserChallenge = require('../models/UserChallenge');

// List all challenges
router.get('/', async (req, res) => {
  try {
    const list = await Challenge.find().select('title description durationDays');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list challenges' });
  }
});

// Get challenge + user progress
router.get('/:id', async (req, res) => {
  try {
    const { userId } = req.query;
    const challenge = await Challenge.findById(req.params.id)
      .populate('workouts.workoutId');
    const progress = userId
      ? await UserChallenge.findOne({ userId, challengeId: challenge._id })
      : null;
    res.json({ challenge, progress });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch challenge' });
  }
});

// Start a challenge
router.post('/:id/start', async (req, res) => {
  try {
    const { userId } = req.body;
    const exists = await UserChallenge.findOne({ userId, challengeId: req.params.id });
    if (exists) return res.status(400).json({ error: 'Already started' });

    const uc = new UserChallenge({
      userId,
      challengeId: req.params.id,
      startDate: new Date(),
      completedDays: []
    });
    await uc.save();
    res.json(uc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to start challenge' });
  }
});

// Mark a day complete
router.post('/:id/complete', async (req, res) => {
  try {
    const { userId, day } = req.body;
    const uc = await UserChallenge.findOne({ userId, challengeId: req.params.id });
    if (!uc) return res.status(404).json({ error: 'Not started' });

    if (!uc.completedDays.includes(day)) {
      uc.completedDays.push(day);
      uc.lastUpdated = new Date();
      await uc.save();
    }
    res.json(uc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to complete day' });
  }
});

module.exports = router;