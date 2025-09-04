import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can Camwood be of help today? 👋' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [handoffData, setHandoffData] = useState(null); // New state for handoff

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMessage = { role: 'user', content: inputValue };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);
    setHandoffData(null); // Clear any previous handoff suggestions

    try {
      const response = await fetch('http://localhost:8787/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newUserMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setTimeout(() => {
        setIsTyping(false);
        const botResponse = { role: 'assistant', content: data.answer };
        setMessages(prevMessages => [...prevMessages, botResponse]);

        if (data.handoff) {
          setHandoffData(data.handoff);
        }

      }, 1000);

    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };
  
  const handleHandoff = async () => {
    // You would gather user info here (e.g., from a form)
    // For this example, we'll use placeholder data
    const payload = {
      fromEmail: 'testuser@example.com',
      name: 'Test User',
      topic: 'Chatbot Handoff',
      message: messages.map(msg => `${msg.role}: ${msg.content}`).join('\n')
    };

    try {
      const response = await fetch('http://localhost:8787/api/handoff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setHandoffData(null); // Clear handoff state
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Thank you! A team member has been notified and will get in touch with you shortly.' }]);
      } else {
        throw new Error('Handoff failed.');
      }
    } catch (error) {
      console.error("Handoff error:", error);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I could not complete the handoff. Please try reaching out directly via email.' }]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
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
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <p>{msg.content}</p>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message assistant typing-indicator">
                <p>Camwood Chat bot is typing...</p>
              </div>
            )}
            {handoffData && (
              <div className="chat-message assistant handoff-options">
                <p>Would you like to connect with a team member?</p>
                <button onClick={handleHandoff}>Connect with a team member</button>
              </div>
            )}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              aria-label="Chat message input"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <button aria-label="Send message" onClick={handleSendMessage} disabled={isTyping}>
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