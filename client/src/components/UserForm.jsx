import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/userform.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    weight: "", height: "", age: "", sex: "", goal: "",
    hypertension: "", diabetes: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/user/getuser"); // backend fetch via session
        setFormData({
          weight: res.data.weight || "",
          height: res.data.height || "",
          age: res.data.age || "",
          sex: res.data.sex || "",
          goal: res.data.goal || "",
          hypertension: res.data.hypertension || "",
          diabetes: res.data.diabetes || "",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/user/user-details", formData);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error submitting data");
    }
  };

  return (
    <div className="userform-container">
      <div className="userform-box">
        <h2>Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} required />
          <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
          <select name="sex" value={formData.sex} onChange={handleChange} required>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select name="hypertension" value={formData.hypertension} onChange={handleChange} required>
            <option value="">Hypertension?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <select name="diabetes" value={formData.diabetes} onChange={handleChange} required>
            <option value="">Diabetes?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
