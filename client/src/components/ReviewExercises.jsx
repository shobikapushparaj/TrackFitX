import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import '../styles/review.css';import { FaPencilAlt, FaCheckCircle } from 'react-icons/fa'; 
const ReviewExercises = () => {
  const [exercises, setExercises] = useState([]);
  const userId = sessionStorage.getItem('userId');


  const fetchExercises = async () => {
    const res = await axios.get(`http://localhost:4000/api/exercise/exercises/${userId}?type=todo`);
    setExercises(res.data);
  };

  const markAsDone = async (id) => {
    await axios.put(`http://localhost:4000/api/exercise/exercise/${id}/complete`, { type: 'done' });
    fetchExercises();
  };

  const handleEdit = async (id) => {
  const current = exercises.find(e => e._id === id);
  if (!current) return alert("Exercise not found");

  const nameInput = prompt("New Exercise Name:", current.name);
  const durationInput = prompt("New Duration:", current.duration);
  const countInput = prompt("New Count:", current.count);
  const dateInput = prompt("New Date (YYYY-MM-DD):", current.date);
  const timeInput = prompt("New Time (HH:MM):", current.time);

  const updatedExercise = {
    name: nameInput === null || nameInput.trim() === "" ? current.name : nameInput.trim(),
    duration: durationInput === null || durationInput.trim() === "" ? current.duration : durationInput.trim(),
    count: countInput === null || countInput.trim() === "" ? current.count : Number(countInput.trim()),
    date: dateInput === null || dateInput.trim() === "" ? current.date : dateInput.trim(),
    time: timeInput === null || timeInput.trim() === "" ? current.time : timeInput.trim(),
  };

  try {
    await axios.put(`http://localhost:4000/api/exercise/exercise/${id}`, updatedExercise);
    fetchExercises();
  } catch (error) {
    console.error("Failed to edit exercise:", error);
  }
};




  useEffect(() => {
    fetchExercises();
  }, [userId]); 

  return (
    <div className="review-exercises-container">
      <NavBar />
      <h2 className="heading" style={{color: '#0c6b76',marginTop:'20px'}}>Review Exercises</h2>
       {exercises.length === 0 ? (
    <p style={{ textAlign: 'center', color: '#ccc', fontSize:'25px'}}>No exercises found.</p>
  ) : (
      exercises.map(ex => (
        <div key={ex._id} className="exercise-card">
          <div className="exercise-header">
            <h4 className="exercise-name">{ex.name}</h4>
            <div className="action-buttons">
              <button className="btn btn-edit" onClick={() => handleEdit(ex._id)}>
                <FaPencilAlt /> Edit
              </button>
              <button className="btn btn-done" onClick={() => markAsDone(ex._id)}>
                <FaCheckCircle /> Done
              </button>
            </div>
          </div>
          <div className="exercise-details">
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