import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      content: 'How can ThinkAI help you today?',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'ai',
      content: 'Hello! I\'m ThinkAI, your intelligent assistant. I can help you with a wide variety of tasks including answering questions, writing content, analyzing data, coding assistance, creative projects, and much more. What would you like to work on today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: `I understand you're asking about "${inputValue}". Let me help you with that. This is a simulated response to demonstrate the chat interface. In a real implementation, this would connect to an AI service to provide intelligent responses.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-interface">
      {/* Header */}
      <div className="chat-header">
        <div className="header-left">
          <div className="back-button" onClick={handleBackClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </div>
          <div className="ai-info">
            <div className="ai-avatar">
              <div className="avatar-gradient"></div>
            </div>
            <div className="ai-details">
              <h3>ThinkAI</h3>
              <span className="ai-status">
                <div className="status-dot"></div>
                Online
              </span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="header-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}-message`}>
              {message.type === 'ai' && (
                <div className="message-avatar">
                  <div className="ai-avatar-small">
                    <div className="avatar-gradient"></div>
                  </div>
                </div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  <p>{message.content}</p>
                </div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message ai-message">
              <div className="message-avatar">
                <div className="ai-avatar-small">
                  <div className="avatar-gradient"></div>
                </div>
              </div>
              <div className="message-content">
                <div className="message-bubble typing-bubble">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <div className="input-wrapper">
          <div className="chat-input-container">
            <button className="input-action-btn attach-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.42 16.4a2 2 0 0 1-2.83-2.83l8.49-8.49"/>
              </svg>
            </button>
            
            <textarea
              ref={inputRef}
              className="chat-input-field"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="1"
            />
            
            <button 
              className="input-action-btn send-btn"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m22 2-7 20-4-9-9-4Z"/>
                <path d="M22 2 11 13"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="input-footer">
          <span className="model-info">
            <div className="status-dot"></div>
            ThinkAI v4.0 • Powered by advanced AI
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;