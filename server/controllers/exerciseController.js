const { ExerciseModel } = require('../models/schema');

// Add exercise
const addExercise = async (req, res) => {
  try {
    const exercise = new ExerciseModel(req.body);
    await exercise.save();
    res.status(201).json({ message: "Exercise added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding exercise", error: err.message });
  }
};

// Get exercises by user ID 
const getExercises = async (req, res) => {
  const { type } = req.query;
  try {
    const exercises = await ExerciseModel.find({
      userId: req.params.userId,
      ...(type && { type })
    });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: "Error fetching exercises", error: err.message });
  }
};

// Delete exercise
const deleteExercise = async (req, res) => {
  try {
    await ExerciseModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exercise deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get completed exercises
const getCompletedExercises = async (req, res) => {
  try {
    const completed = await ExerciseModel.find({
      userId: req.params.userId,
      completed: true
    });
    res.json(completed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an exercise
const updateExercise = async (req, res) => {
  try {
    const updatedExercise = await ExerciseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedExercise);
  } catch (err) {
    res.status(500).json({ message: "Error updating exercise", error: err.message });
  }
};

// Mark exercise as complete
const markExerciseAsComplete = async (req, res) => {
  try {
    const exercise = await ExerciseModel.findByIdAndUpdate(
      req.params.id,
      { type: 'done' }, 
      { new: true }
    );
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ message: "Error marking as complete", error: err.message });
  }
};


module.exports = {
  addExercise,
  getExercises,
  deleteExercise,
  getCompletedExercises,
  updateExercise,
  markExerciseAsComplete
};
