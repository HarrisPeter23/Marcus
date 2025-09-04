import React, { useState } from 'react';
import './InputArea.css';

const AttachIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path 
      d="M6.5 9.5L12 4C13.3333 2.66667 15.1667 2.66667 16.5 4C17.8333 5.33333 17.8333 7.16667 16.5 8.5L8 17C6.33333 18.6667 3.66667 18.6667 2 17C0.333329 15.3333 0.333329 12.6667 2 11L11 2"
      stroke="#9e8fc8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
  </svg>
);


const SendIcon = () => (
  <svg height="22" width="22" viewBox="0 0 24 24" fill="#9e8fc8" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const InputArea = () => {
  const [msg, setMsg] = useState('');
  return (
    <form className="input-area">
      <button type="button" className="attach-btn" aria-label="Attach file">
        <AttachIcon />
      </button>
      <input
        type="text"
        value={msg}
        onChange={e => setMsg(e.target.value)}
        placeholder="Ask your business AI assistant..."
      />
      <button type="submit" className="send-btn">
        <SendIcon />
      </button>
    </form>
  );
};

export default InputArea;
