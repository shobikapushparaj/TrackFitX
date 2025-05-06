import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './UserProfile.css'; // Optional: for styling
import { IoCloseSharp } from "react-icons/io5";

const UserProfile = ({ userId, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage.setItem("userId", response.data._id); 
    const userId = sessionStorage.getItem('userId');
    console.log(userId);

    if (userId) {
      axios.get(`http://localhost:4000/getuser/${userId}`)
        .then(response => {
          setUserDetails(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          alert("Failed to fetch user details. Please try again later.");
          setLoading(false);
        });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:4000/updateuser/${userId}`, userDetails)
      .then(result => {
        if (result.data.message === "Email already exists") {
          alert("Email already exists. Please use another email.");
        } else if (result.data.message === "Username already exists") {
          alert("Username already exists. Please use another username.");
        } else {
          setUserDetails(result.data);
          setEditMode(false);
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.response?.data?.message || "Something went wrong.");
      });
  };

  if (loading) return <div>Loading...</div>;
  if (!userDetails) return <div>No user found.</div>;

  return (
    <div className="user-profile-popup">
      <IoCloseSharp className="close-icon" onClick={onClose} size={32} />

      {editMode ? (
        <div className="edit-form">
         <input type="text" name="name" value={userDetails.name || ''} onChange={handleInputChange} />
<input type="email" name="email" value={userDetails.email || ''} onChange={handleInputChange} />
<input type="number" name="weight" placeholder="Weight (kg)" value={userDetails.weight || ''} onChange={handleInputChange} />
<input type="number" name="height" placeholder="Height (cm)" value={userDetails.height || ''} onChange={handleInputChange} />
<input type="number" name="age" placeholder="Age" value={userDetails.age || ''} onChange={handleInputChange} />
<select name="sex" value={userDetails.sex || ''} onChange={handleInputChange}>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
<select name="hypertension" value={userDetails.hypertension || ''} onChange={handleInputChange}>
  <option value="">Hypertension?</option>
  <option value="0">No</option>
  <option value="1">Yes</option>
</select>
<select name="diabetes" value={userDetails.diabetes || ''} onChange={handleInputChange}>
  <option value="">Diabetes?</option>
  <option value="0">No</option>
  <option value="1">Yes</option>
</select>
<button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="view-details">
          <p><strong>Name:</strong> {userDetails.name}</p>
<p><strong>Email:</strong> {userDetails.email}</p>
<p><strong>Weight:</strong> {userDetails.weight} kg</p>
<p><strong>Height:</strong> {userDetails.height} cm</p>
<p><strong>Age:</strong> {userDetails.age}</p>
<p><strong>Gender:</strong> {userDetails.sex}</p>
<p><strong>Hypertension:</strong> {userDetails.hypertension === "1" ? "Yes" : "No"}</p>
<p><strong>Diabetes:</strong> {userDetails.diabetes === "1" ? "Yes" : "No"}</p>
          <button
            style={{
              width: "60px",
              height: "30px",
              borderRadius: "10px",
              fontFamily: "Itim",
            }}
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
