import React, { useState } from 'react';
import "../Support/chatbot.css";

const ChatBot = () => {
  const [chatInit, setChatInit] = useState(false);
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);

  // Stored in db 
  const data = {
    chatinit: {
      title: ["Hello I’m Mr. Chatbot, how can I help you?"],
      options: ["Profile", "Cart", "Support"]
    },

    Profile: {
      title: ["Please select what you're having problems with"],
      options: ["Account", "Privacy", "Others"],
    },
      Account: {
        title: ["Please clarify the problem"],
        options: ["Login Issues", "Update Information", "Delete Account"]
      },
      Privacy: {
        title: ["What privacy issue are you facing?"],
        options: ["Data Access", "Data Deletion", "Data Sharing"]
      },
      
    Cart: {
      title: ["What issues are you having with your cart?"],
      options: ["Add Items", "Remove Items", "View Cart"]
    },

    Support: {
      title: ["How can we support you?"],
      options: ["Technical Support", "Login Issues", "General Inquiry", "Update Information"]
    },
      "Login Issues": {
        title: ["Are you having trouble logging in? (navigate to contactus)"],
        options: ["Forgot Password", "Account Locked"]
      },
      "Update Information": {
        title: ["What information do you want to update? (navigate to profile)"],
        options: ["Email", "Phone Number", "Address"]
      }
    // More objects can be added as needed
  };

  const handleMessage = (msg) => {
    setMessages(prevMessages => [...prevMessages, msg]);
  };

  const handleOptionClick = (option) => {
    handleMessage(option);
    const selectedOption = option;
    if (data[selectedOption]) {
      handleMessage(data[selectedOption].title[0]);
      setOptions(data[selectedOption].options);
    } else {
      handleMessage("Sorry, I didn't understand that. Please select an option.");
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
    <div class="container">
      <div class="d-flex justify-content-between">
        <div className="chatbot-container ">
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
      </div>

    </div>
    
    
  );
};

export default ChatBot;
