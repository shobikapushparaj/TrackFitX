import ReactMarkdown from 'react-markdown'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const ChatBot = ({ userId }) => {
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);
  const [userData, setUserData] = useState(null);

  // Fetch user metrics from MongoDB backend on component mount
  useEffect(() => {
    axios.get(`http://localhost:4000/getuser/${userId}`)
      .then(res => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch(err => console.log(err));
  }, [userId]);

  const handleSend = async () => {
    if (!question || !userData) return;

    try {
      const res = await axios.post('http://localhost:5000/predict', {
        query: question,
        metrics: {
          sex: userData.sex || "Male",  // Ensure 'sex' is part of user data
          Age: parseInt(userData.age),
          Height: parseFloat(userData.height) / 100, // cm to meters
          Weight: parseFloat(userData.weight),
          Hypertension: userData.hypertension || "No",  // Assuming these fields exist
          Diabetes: userData.diabetes || "No",  // Same here
        }
      });
      const botResponse = res.data.response;
      setChat([...chat, { from: 'user', text: question }, { from: 'bot', text: botResponse }]);
    } catch (err) {
      console.error('Error contacting model:', err);
      setChat([...chat, { from: 'user', text: question }, { from: 'bot', text: "Error contacting model." }]);
    }

    setQuestion('');
  };

  return (
    <div className="chatbot-container">
      <div className="chat-box">
        {chat.map((msg, idx) => (
          <div key={idx} className={msg.from === 'user' ? 'user-msg' : 'bot-msg'}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
