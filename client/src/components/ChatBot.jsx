import ReactMarkdown from 'react-markdown'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/chatbot.css';

const ChatBot = ({ userId }) => {
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/user/getuser/${userId}`)
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
            sex: userData.sex || "Male",
            Age: parseInt(userData.age),
            Height: parseFloat(userData.height) / 100, // cm to meters
            Weight: parseFloat(userData.weight),
            Hypertension:
            userData.hypertension === true ||
            userData.hypertension === "1" ||
            userData.hypertension === 1 ||
            userData.hypertension === "Yes"
            ? "Yes"
            : "No",

           Diabetes:
           userData.diabetes === true ||
           userData.diabetes === "1" ||
           userData.diabetes === 1 ||
           userData.diabetes === "Yes"
           ? "Yes"
           : "No",
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
