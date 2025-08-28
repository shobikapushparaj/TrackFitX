import React, { useEffect, useState } from 'react';
import api from '../api/api';
import NavBar from './NavBar';
import '../styles/review.css';
import { FaPencilAlt, FaCheckCircle } from 'react-icons/fa';

const ReviewExercises = () => {
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const res = await api.get("/exercise/exercises?type=todo");
      setExercises(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchExercises(); }, []);

  const markAsDone = async (id) => {
    try {
      await api.put(`/exercise/exercise/${id}/complete`);
      fetchExercises();
    } catch (err) { console.error(err); }
  };

  const handleEdit = async (id) => {
    const current = exercises.find(e => e._id === id);
    if (!current) return;
    const nameInput = prompt("New Exercise Name:", current.name);
    const durationInput = prompt("New Duration:", current.duration);
    const countInput = prompt("New Count:", current.count);
    const dateInput = prompt("New Date (YYYY-MM-DD):", current.date);
    const timeInput = prompt("New Time (HH:MM):", current.time);

    const updatedExercise = {
      name: nameInput || current.name,
      duration: durationInput || current.duration,
      count: countInput || current.count,
      date: dateInput || current.date,
      time: timeInput || current.time,
    };

    try {
      await api.put(`/exercise/exercise/${id}`, updatedExercise);
      fetchExercises();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="review-exercises-container">
      <NavBar />
      <h2>Review Exercises</h2>
      {exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        exercises.map(ex => (
          <div key={ex._id} className="exercise-card">
            <div className="exercise-header">
              <h4>{ex.name}</h4>
              <div>
                <button onClick={() => handleEdit(ex._id)}><FaPencilAlt /> Edit</button>
                <button onClick={() => markAsDone(ex._id)}><FaCheckCircle /> Done</button>
              </div>
            </div>
            <div>
              <p><strong>Date:</strong> {ex.date} at {ex.time}</p>
              <p><strong>Count:</strong> {ex.count}</p>
              <p><strong>Duration:</strong> {ex.duration}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewExercises;
