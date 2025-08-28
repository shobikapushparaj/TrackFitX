const express = require('express');
const router = express.Router();
const {
  addExercise,
  getExercises,
  deleteExercise,
  getCompletedExercises,
  updateExercise,
  markExerciseAsComplete
} = require('../controllers/exerciseController');
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.post('/add-exercise', authMiddleware, addExercise);
router.get('/exercises/:userId', authMiddleware, getExercises);
router.delete('/delete-exercise/:id', authMiddleware, deleteExercise);
router.get('/completed/:userId', authMiddleware, getCompletedExercises);
router.put('/exercise/:id', authMiddleware, updateExercise);
router.put('/exercise/:id/complete', authMiddleware, markExerciseAsComplete);

module.exports = router;
