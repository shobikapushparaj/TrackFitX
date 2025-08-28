import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { name, password });
      if (response.data && response.data.token) {
        sessionStorage.setItem('token', response.data.token);
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
      <div className="loginRight">
        <h1 className="gradient-login-text1">WELCOME BACK</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="my-text-style-login">Username</label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="my-text-style-login">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginbt">Login</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
