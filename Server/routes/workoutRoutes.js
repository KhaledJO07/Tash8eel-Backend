// const express = require('express');
// const router = express.Router();
// const Workout = require('../models/Workout');

// // Get all workouts
// router.get('/', async (req, res) => {
//   try {
//     const workouts = await Workout.find();
//     res.json(workouts);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch workouts' });
//   }
// });

// // Get workouts by category
// router.get('/category/:category', async (req, res) => {
//   try {
//     const workouts = await Workout.find({ category: req.params.category });
//     res.json(workouts);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch by category' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// GET all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    const fullWorkouts = workouts.map(w => ({
      ...w._doc,
      animationUrl: `${req.protocol}://${req.get('host')}/animations/${w.animationFile}`
    }));
    res.json(fullWorkouts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET workouts by category
router.get('/category/:category', async (req, res) => {
  try {
    const workouts = await Workout.find({ category: req.params.category });
    const fullWorkouts = workouts.map(w => ({
      ...w._doc,
      animationUrl: `${req.protocol}://${req.get('host')}/animations/${w.animationFile}`
    }));
    res.json(fullWorkouts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts by category' });
  }
});

module.exports = router;
