import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      <button id="chatbot-trigger" aria-label={isOpen ? "Close chatbot" : "Open chatbot"} onClick={toggleChatbot}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="chatbot-window" id="chatbot-window">
          <div className="chatbot-header">
            <h3>Camwood Bot</h3>
            <button className="chatbot-close-btn" aria-label="Close chatbot" onClick={toggleChatbot}>×</button>
          </div>
          <div className="chatbot-body">
            <div className="chat-message">
              <p>Hello! How can Camwood be of help today? 👋</p>
            </div>
          </div>
          <div className="chatbot-input">
            <input type="text" placeholder="Type a message..." aria-label="Chat message input" />
            <button aria-label="Send message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;