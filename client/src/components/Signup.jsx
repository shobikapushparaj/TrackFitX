import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';

<span>Already a user? <Link to='/login'>Login</Link></span>


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!username || !email || !password) {
      alert('Please fill all the fields.');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    axios.post('http://localhost:4000/register', { username, email, password })
      .then(result => {
        console.log(result);
        if (result.data.message === "Email already exists") {
          window.alert("Email already exists. Please use another email.");
        } else if (result.data.message === "Username already exists") {
          window.alert("Username already exists. Please use another username.");
        } else if (result.data.message === "User created successfully") {
          sessionStorage.setItem('userId', result.data.userId);
          console.log(result.data.userId);
          navigate('/userform', { state: { userId: result.data.userId } });
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          window.alert(error.response.data.message);
        } else {
          window.alert("Something went wrong. Please try again later.");
        }
      });
  };
  return (
    <div className='signupContainer'>
      <div className='signupLeft'>
        <h1 className='gradient-signup-text1'>REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className='my-text-style-signup'>Email</label>
            <input type="email" id="email" name="email" style={{marginLeft:'70px'}}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="username" className='my-text-style'>Username</label>
            <input type="text" id="username" name="username" style={{marginLeft:'30px'}}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className='my-text-style'>Password</label>
            <input type="password" id="password" name="password" style={{marginLeft:'34px'}}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className='signupbt'>Signup</button>
        </form>
        <p style={{marginTop:'25px', fontSize:'18px',marginLeft:'50px'}}>Already an user? <Link to='/login'style={{ color: '#21a7b6', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
