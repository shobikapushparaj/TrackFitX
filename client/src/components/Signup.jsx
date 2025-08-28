import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import '../styles/signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert('Please fill all the fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const result = await api.post('/auth/register', { name: username, email, password });
      if (result.data.token) {
        sessionStorage.setItem('token', result.data.token);
        navigate('/userform');
      } else {
        alert(result.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='signupContainer'>
      <div className='signupLeft'>
        <h1 className='gradient-signup-text1'>REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className='my-text-style-signup'>Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="username" className='my-text-style'>Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className='my-text-style'>Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className='signupbt'>Signup</button>
        </form>
        <p>Already a user? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
