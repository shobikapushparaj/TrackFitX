
import React, { useState } from 'react';
import { FaUser, FaPlus, FaHistory, FaHome, FaClipboardList,FaCalculator} from "react-icons/fa";
import { Link,Navigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import ChatBot from './ChatBot';  
import '../styles/navbar.css';

const NavBar = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const userId = sessionStorage.getItem('userId');

  const toggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
  };

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <nav className='navbar' style={{backgroundColor:'#0c6b76'}}>
        <p className='title'>TrackFitX</p>
        <Link to='/dashboard'><FaHome /> Home</Link>
        <Link to='/addexercise'><FaPlus /> Add Exercise</Link>
        <Link to='/review'><FaClipboardList /> Review</Link>
        <Link to='/history'><FaHistory /> History</Link>
        <Link to='/calculator'><FaCalculator /> Calculator</Link>
        <FaUser className='user-icon' onClick={toggleUserProfile} />
      </nav>
      
      {showUserProfile && (
          <UserProfile userId={userId} onClose={toggleUserProfile} />
      )}
      
      <button className="chatbot-toggle" onClick={toggleChatBot}>
        🤖 Chat
      </button>

      {showChatBot && (
        <div className="chatbot-popup">
          <ChatBot userId={userId} />
        </div>
      )}
    </>
  );
};

export default NavBar;
