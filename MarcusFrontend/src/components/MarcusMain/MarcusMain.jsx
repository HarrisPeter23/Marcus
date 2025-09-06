// MarcusMain.jsx
import React from "react";
import "./MarcusMain.css";

export default function MarcusMain() {
  return (
    <main className="main-content">
      <div className="avatar"></div>
      <h1 className="greeting">Good evening, Milovan</h1>
      <h2 className="subtitle">Can I help you with anything?</h2>
      {/* <p className="description">
        Choose a prompt below or write your own to start<br />chatting with ThinkAI
      </p>
      <div className="suggestion-cards">
        <div className="suggestion-card">
          <h3>Get fresh perspectives on tricky problems</h3>
        </div>
        <div className="suggestion-card">
          <h3>Brainstorm creative ideas</h3>
        </div>
        <div className="suggestion-card">
          <h3>Rewrite message for maximum impact</h3>
        </div>
        <div className="suggestion-card">
          <h3>Summarize key points</h3>
        </div>
      </div> */}
      <div className="input-section">
        <div className="input-container">
          <input type="text" className="input-field" placeholder="How can ThinkAI help you today?" />
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
          <div className="input-actions">
            <button className="icon-button">📎</button>
            <button className="icon-button">🎤</button>
          </div>
        </div>
        <div className="model-info">
          <div className="status-dot"></div>
          ThinkAI 3.5 Smart
          <span style={{opacity: 0.5}}>Personal ▼</span>
        </div>
      </div>
      <div className="bottom-info">
        ThinkAI can make mistakes. Please double-check responses.
        <div style={{marginTop: 8, opacity: 0.7}}>
          Use <span style={{color: '#c084fc'}}>shift + return</span> for new line
        </div>
      </div>
    </main>
  );
}
