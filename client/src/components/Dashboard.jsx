import React, { useEffect, useState } from "react";
import api from "../api/api";
import NavBar from "./NavBar";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("/user/getuser");
        setUserData(userRes.data);

        const exerciseRes = await api.get("/exercise/exercises?type=todo");
        setExercises(exerciseRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <NavBar />
      <h1>Welcome, {userData.name}</h1>
      <div className="dashboard-stats">
        <p>Weight: {userData.weight} kg</p>
        <p>Height: {userData.height} cm</p>
        <p>Age: {userData.age}</p>
        <p>Goal: {userData.goal}</p>
      </div>
      <h2>Today's Exercises</h2>
      {exercises.length === 0 ? (
        <p>No exercises for today.</p>
      ) : (
        exercises.map((ex) => (
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

export default Dashboard;
