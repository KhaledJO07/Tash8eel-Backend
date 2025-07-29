const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

// GET all workouts
router.get('/', workoutController.getAllWorkouts);

// GET workouts by category
router.get('/category/:category', workoutController.getWorkoutsByCategory);

// POST a new workout
router.post('/', workoutController.createWorkout);

module.exports = router;
