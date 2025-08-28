import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import ChatBot from './ChatBot';  
import '../styles/navbar.css';

const NavBar = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  const toggleUserProfile = () => setShowUserProfile(!showUserProfile);
  const toggleChatBot = () => setShowChatBot(!showChatBot);

  // Check if session exists (backend should expose /auth/check endpoint)
  const [authenticated, setAuthenticated] = useState(true); // or check via api call

  if (!authenticated) return <Navigate to="/login" />;

  return (
    <>
      <nav className='navbar' style={{backgroundColor:'#0c6b76'}}>
        <p className='title'>TrackFitX</p>
        <Link to='/dashboard'>Home</Link>
        <Link to='/addexercise'>Add Exercise</Link>
        <Link to='/review'>Review</Link>
        <Link to='/history'>History</Link>
        <Link to='/calculator'>Calculator</Link>
        <button onClick={toggleUserProfile}>Profile</button>
      </nav>
      
      {showUserProfile && <UserProfile onClose={toggleUserProfile} />}
      
      <button className="chatbot-toggle" onClick={toggleChatBot}>🤖 Chat</button>
      {showChatBot && <div className="chatbot-popup"><ChatBot /></div>}
    </>
  );
};

export default NavBar;
