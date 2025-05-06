import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../index.css";

// Define the updateUserDetails function separately
const updateUserDetails = async (userId, weight, height, age, sex, goal, hypertension, diabetes) => {
  try {
    const response = await axios.put(`http://localhost:4000/user-details/${userId}`, {
      weight,
      height,
      age,
      sex,
      goal,
      hypertension,
      diabetes
    });
    console.log('User details updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};


const UserForm = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    sex: "", // Keep this as 'sex' consistently
    hypertension: "",
    diabetes: "",
  });
  

  const navigate = useNavigate();
  const location = useLocation();  // Used to get the passed state from navigate

  const userId = location.state?.userId || sessionStorage.getItem('userId'); // Get userId from navigate or sessionStorage

  // Fetch user data on component mount
  // useEffect(() => {
  //   if (userId) {
  //     axios
  //       .get(`http://localhost:4000/user-details/${userId}`)  // Adjust API endpoint
  //       .then((res) => {
  //         const { weight, height, age, gender, goal } = res.data || {};
  //         setFormData({
  //           weight: weight ?? "",
  //           height: height ?? "",
  //           age: age ?? "",
  //           gender: gender ?? "",
  //           goal: goal ?? "",
  //         });
  //       })
  //       .catch((err) => console.error("Error fetching user data:", err));
  //   }
  // }, [userId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4000/user-details/${userId}`)  // Adjust API endpoint if needed
        .then((res) => {
          // Destructure the response data and ensure 'sex' is used instead of 'gender'
          const { weight, height, age, sex, goal } = res.data || {};
          
          // Update the form data state with the fetched values
          setFormData({
            weight: weight ?? "",
            height: height ?? "",
            age: age ?? "",
            sex: sex ?? "",  // Ensure you're using 'sex' here
            goal: goal ?? "",
          });
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [userId]);
  
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        // Call the updateUserDetails function with the form data
        await updateUserDetails(
          userId,
          formData.weight,
          formData.height,
          formData.age,
          formData.sex,
          formData.goal,
          formData.hypertension,
          formData.diabetes
        );
        
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Error submitting data");
    }
  };

  return (
    <div className="userform-container">
      <div className="userform-box">
        <h2 className="userform-title">Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            className="userform-input"
            required
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            className="userform-input"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="userform-input"
            required
          />
          <select
  name="sex"
  value={formData.sex}
  onChange={handleChange}
  className="userform-input"
  required
>
  <option value="">Select gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>


<select
  name="hypertension"
  value={formData.hypertension}
  onChange={handleChange}
  className="userform-input"
  required
>
  <option value="">Hypertension?</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>

<select
  name="diabetes"
  value={formData.diabetes}
  onChange={handleChange}
  className="userform-input"
  required
>
  <option value="">Diabetes?</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>
          <button type="submit" className="userform-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
