
import React, { useState } from 'react';
import { FaUser, FaPlus, FaHistory, FaHome, FaClipboardList,FaCalculator} from "react-icons/fa";
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import ErrorBoundary from './ErrorBoundary';  // Import ErrorBoundary
import ChatBot from './ChatBot';  // Import ChatBot component
import '../index.css';

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

  // Check if userId exists before rendering UserProfile component
  if (!userId) {
    return (
      <div>Please log in to view your profile</div>
    );
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
        <ErrorBoundary>
          <UserProfile userId={userId} onClose={toggleUserProfile} />
        </ErrorBoundary>
      )}
      
      {/* Floating ChatBot button */}
      <button className="chatbot-toggle" onClick={toggleChatBot}>
        🤖 Chat
      </button>

      {/* ChatBot popup */}
      {showChatBot && (
        <div className="chatbot-popup">
          <ChatBot userId={userId} />
        </div>
      )}
    </>
  );
};

export default NavBar;
