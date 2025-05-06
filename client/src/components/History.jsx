
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

export const History = () => {
  const [completed, setCompleted] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    axios.get(`http://localhost:4000/exercises/${userId}?type=done`)
      .then(res => {
        console.log(res.data);
        setCompleted(res.data);
      });
  }, [userId]);

  return (
    <div className="history-container">
  <NavBar />
  <h2 className="history-title">Exercise History</h2>
  {completed.length === 0 ? (
    <p style={{ textAlign: 'center', color: '#ccc' }}>No completed exercises found.</p>
  ) : (
    completed.map(c => (
      <div className="history-card" key={c._id}>
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        <div>
        <h4>{c.name}</h4>
        <p><strong>Date:</strong> {c.date}</p>
        <p><strong>Time:</strong> {c.time}</p>
        <p><strong>Count:</strong> {c.count}</p>
        <p><strong>Duration:</strong> {c.duration}</p>
        </div>
        </div>
      </div>
    ))
  )}
</div>

  );

};
