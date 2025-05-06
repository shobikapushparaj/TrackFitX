import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import '../index.css';import { FaPencilAlt, FaCheckCircle } from 'react-icons/fa'; 
const ReviewExercises = () => {
  const [exercises, setExercises] = useState([]);
  const userId = sessionStorage.getItem('userId');


  const fetchExercises = async () => {
    const res = await axios.get(`http://localhost:4000/exercises/${userId}?type=todo`);
    setExercises(res.data);
  };

  const markAsDone = async (id) => {
    await axios.put(`http://localhost:4000/exercise/${id}/complete`, { type: 'done' });
    fetchExercises();
  };

  const handleEdit = async (id) => {
    const name = prompt("New Exercise Name:");
    const duration = prompt("New Duration:");
    await axios.put(`http://localhost:4000/exercise/${id}`, { name, duration });
    fetchExercises();
  };

  useEffect(() => {
    fetchExercises();
  }, [userId]); // just in case userId ever changes  

  return (
    <div className="review-exercises-container">
      <NavBar />
      <h2 className="heading" style={{color: '#0c6b76',marginTop:'20px'}}>Review Exercises</h2>
      {exercises.map(ex => (
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
      ))}
    </div>
  );
};

export default ReviewExercises;