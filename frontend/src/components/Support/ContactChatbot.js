import React, { useState } from 'react';
import "../Support/chatbot.css";

const ChatBot = () => {
  const [chatInit, setChatInit] = useState(false);
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);


  //stored in db 
  const data = {
    chatinit: {
      title: ["Hello I’m mr chatbot, how can I help you?"],
      options: ["Profile", 'Cart']
    },
    profile: {
      title: ["Please select what you're having problems with"],
      options: ['Account', 'Privacy', 'others'],
    },
    //objects
  };

  const handleMessage = (msg) => {
    setMessages([...messages, msg]);
  };

  const handleOptionClick = (option) => {
    handleMessage(option);
    const selectedOption = option.toLowerCase();
    if (data[selectedOption]) {
      handleMessage(data[selectedOption].title[0]);
      setOptions(data[selectedOption].options);
    } else {
      setOptions([]);
    }
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <button key={index} className="option-btn" onClick={() => handleOptionClick(option)}>{option}</button>
    ));
  };

  const startChat = () => {
    setChatInit(true);
    setMessages(data.chatinit.title);
    setOptions(data.chatinit.options);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        {!chatInit ? (
          <button className="start-chat-btn" onClick={startChat}>START CHAT</button>
        ) : (
          <div className="chat-window">
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
  );
};

export default ChatBot;
