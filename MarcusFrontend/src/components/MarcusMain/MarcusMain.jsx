// MarcusMain.jsx
import React from "react";
import "./MarcusMain.css";

export default function MarcusMain() {
  return (
    <main className="main-content">
      <div className="avatar"></div>
      <h1 className="greeting">Good evening, Milovan</h1>
      <h2 className="subtitle">Can I help you with anything?</h2>
      <div className="input-section">
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="How can ThinkAI help you today?"
            autoComplete="off"
          />
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
          <div className="input-actions">
            <button className="icon-button attach-btn" title="Attach a file" type="button">
              {/* Paperclip SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-8.5 8.5a5.5 5.5 0 0 1-7.78-7.78l9-9a3.5 3.5 0 0 1 4.95 4.95l-9.5 9.5"/>
              </svg>
            </button>
            <button className="icon-button send-btn" title="Send" type="submit">
              {/* Paper plane SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a21caf" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="bottom-info">
        Marcus can make mistakes. Please double-check responses.
        <div style={{ marginTop: 8, opacity: 0.7 }}>
          Use <span style={{ color: '#c084fc' }}>shift + return</span> for new line
        </div>
      </div>
    </main>
  );
}
