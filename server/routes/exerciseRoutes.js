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


router.post('/add-exercise', addExercise);
router.get('/exercises/:userId', getExercises);
router.delete('/delete-exercise/:id', deleteExercise);
router.get('/completed/:userId', getCompletedExercises);
router.put('/exercise/:id', updateExercise);
router.put('/exercise/:id/complete', markExerciseAsComplete);

module.exports = router;
