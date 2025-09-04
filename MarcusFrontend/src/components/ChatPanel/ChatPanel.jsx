import React from 'react';
import InputArea from '../InputArea/InputArea';
import './ChatPanel.css';

const ChatPanel = () => (
  <div className="chat-panel">
    <div style={{ fontWeight: "500", fontSize: "1.1rem", color: "#17043d", marginBottom: "7px" }}>
      AI Business Intelligence
    </div>
    <div style={{ color: "#9b8ac8", marginBottom: "10px" }}>AI-powered business assistant</div>
    <div className="chat-msg-bubble">
      Welcome to Marcus Intelligence Enterprise. I'm your business AI consultant, ready to help with analytics, automation, strategic planning, and operational insights. How can I assist your business today?
      <span className="chat-time">8:51:17 PM</span>
    </div>
    <InputArea />
  </div>
);

export default ChatPanel;
