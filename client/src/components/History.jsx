import React, { useEffect, useState } from "react";
import api from "../api/api";
import NavBar from "./NavBar";
import "../styles/history.css";

const History = () => {
  const [completedExercises, setCompletedExercises] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/exercise/exercises?type=done");
        setCompletedExercises(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <NavBar />
      <h2>Completed Exercises</h2>
      {completedExercises.length === 0 ? (
        <p>No completed exercises found.</p>
      ) : (
        completedExercises.map((ex) => (
          <div key={ex._id} className="exercise-card">
            <h4>{ex.name}</h4>
            <p>{ex.count} reps / {ex.duration}</p>
            <p>{ex.date} at {ex.time}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
