import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import "./chatbot.css";

const ChatBot = () => {
  const [chatInit, setChatInit] = useState(false);
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({
    chatinit: {
      title: ["Hello I’m Mr. Chatbot, how can I help you?"],
      options: ["Profile", "Cart", "Support"]
    }
  });

  const navigate = useNavigate()
  
  const getChatbotData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getChatbotData`);
      console.log(response.data);
      
      if(response.data == {}) {
        alert('no chatbot data')
        
      } else setData(response.data);
        
    } catch (error) {
      console.error('Error fetching chatbotdata:', error);
    }
  };

  useEffect(() => {
    getChatbotData()
  },[])


  const handleMessage = (msg) => {
    setMessages(prevMessages => [...prevMessages, msg]);
  };

  const handleOptionClick = (option) => {
    handleMessage(option);
    const selectedOption = option;
    //if its present
    if (data[selectedOption]) {
      handleMessage(data[selectedOption].title[0]);
      setOptions(data[selectedOption].options);
    } else {

      if(option == "Forgot Password" || option == "Logi Issues") {
        navigate('/support/FAQ')
      } else if( option == "Update Information") {
        navigate('/profile')
      } else if(["Add Items", "Remove Items", "View Cart"].some((item) => (item == option))) {
        navigate('/cart')
      } else if(["Technical Support", "Login Issues", "General Inquiry"].some((item) => (item == option))) {
        navigate('/support/ContactUs')
      } else if(["Data Access", "Data Deletion", "Data Sharing"].some(item => (item == option))) {
        handleMessage("Sorry, " + option + " is currently under development process ")
      } else
        handleMessage("Sorry, I didn't understand that. Please select an option.");
      // setOptions([]);
    }
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <button key={index} className="option-btn" onClick={() => {
        handleOptionClick(option)
      }}>{option}</button>
    ));
  };

  const startChat = (when) => {
    setChatInit(true);
    setMessages(data.chatinit.title);
    if(when) {
      setOptions([])
      setChatInit(false)
    }
    else 
      setOptions(data.chatinit.options);
  };

  return (
    <div class="chatbot-container container chatbox-overflow">
      <div class="d-flex justify-content-between">
        <div className='chatbot-container'>
          <img className='shadow-sm rounded-3 img-fluid' 
          src="https://www.shutterstock.com/image-vector/chat-bot-logo-design-concept-600nw-1938811039.jpg"
          alt="chatbot image" />
        </div>
        <div className="chatbot-container2">
          <div className="chatbot">
            {!chatInit ? (
              <button className="start-chat-btn" onClick={() => startChat(false)}>START CHAT</button>
            ) : (
              <div className="chat-window">
                <button className="restartBtn position-absolute rounded-3" 
                  onClick={() => startChat(true)}><i className='fa fa-refresh'/></button>
                <div className="messages">
                  {messages.map((msg, index) => (
                    <p key={index} className={`msg ${index % 2 === 0 ? 'bot' : 'user'}`}>{msg}</p>
                  ))}
                </div>
                <div className="options">
                  {renderOptions()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
    
    
  );
};

export default ChatBot;
