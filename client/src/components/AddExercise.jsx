import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import '../index.css';
const AddExercise = () => {
  const userId = sessionStorage.getItem('userId');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    count: '',
    duration: '',
    userId: userId,
    type: 'todo'
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/add-exercise', formData);
      alert('Exercise Added!');
      setFormData({ name: '', date: '', time: '', count: '', duration: '', userId, type: 'todo' });
    } catch (err) {
      alert('Failed to add exercise. Please try again.');
      console.error(err);
    }
  };
  return (
    <div>
      <NavBar />
      <div className="exercise-form-container">
        <h2>Add New Exercise</h2>
        <form className="exercise-form" onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Exercise Name" />
          <input name="date" type="date" value={formData.date} onChange={handleChange} />
          <input name="time" type="time" value={formData.time} onChange={handleChange} />
          <input name="count" type="number" value={formData.count} onChange={handleChange} placeholder="Count" />
          <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g., 30 min)" />
          <button type="submit">Add Exercise</button>
        </form>
      </div>
    </div>
  );
};

export default AddExercise;