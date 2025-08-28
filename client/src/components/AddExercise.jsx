import React, { useState } from 'react';
import api from "../api/api";
import NavBar from './NavBar';
import '../styles/addform.css';

const AddExercise = () => {
  const [formData, setFormData] = useState({
    name: '', date: '', time: '', count: '', duration: '', type: 'todo'
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.time || !formData.count || !formData.duration) {
      alert("Please fill all the fields.");
      return;
    }
    try {
      await api.post("/exercise/add-exercise", formData);
      alert('Exercise Added!');
      setFormData({ name: '', date: '', time: '', count: '', duration: '', type: 'todo' });
    } catch (err) {
      alert('Failed to add exercise.');
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
          <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" />
          <button type="submit">Add Exercise</button>
        </form>
      </div>
    </div>
  );
};

export default AddExercise;
