import React, { useEffect, useState } from "react";
import api from "../api/api";
import NavBar from "./NavBar";
import "../styles/userprofile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/getuser");
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <NavBar />
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Age:</strong> {userData.age}</p>
        <p><strong>Weight:</strong> {userData.weight} kg</p>
        <p><strong>Height:</strong> {userData.height} cm</p>
        <p><strong>Gender:</strong> {userData.sex}</p>
        <p><strong>Goal:</strong> {userData.goal}</p>
        <p><strong>Hypertension:</strong> {userData.hypertension}</p>
        <p><strong>Diabetes:</strong> {userData.diabetes}</p>
      </div>
    </div>
  );
};

export default UserProfile;
