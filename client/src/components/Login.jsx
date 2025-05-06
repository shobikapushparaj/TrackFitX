import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:4000/login', { name, password });
      const userData = response.data;

      if (userData && userData.id) {
        sessionStorage.setItem('userId', userData.id);
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Incorrect username or password');
      } else {
        setError('An error occurred during login. Please try again later.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginLeft">
        {/* Optional: Add an image or branding here */}
      </div>
      <div className="loginRight">
        <h1 className="gradient-login-text1" style={{ fontSize: '50px', marginBottom: '50px', fontWeight: 'bold', marginLeft: '30px' }}>
          WELCOME BACK
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" style={{ fontSize: '38px', fontWeight: 'bold' }} className="my-text-style-login">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              style={{ marginLeft: '50px' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={{ fontSize: '38px', fontWeight: 'bold' }} className="my-text-style-login">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              style={{ marginLeft: '60px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginbt" style={{ fontSize: '22px', fontWeight: 'bold' }}>
            Login
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
