import React from "react";
import "./MarcusMain.css";

const MarcusMain = () => {
  return (
    <main className="marcus-main">
      <h2 className="marcus-title">
        <span className="metallic-shine">
          What Can <span className="marcus-title-highlight">Marcus Help</span> You With Today?
        </span>
      </h2>
      <form className="marcus-form">
        <input 
          className="marcus-input" 
          type="text" 
          placeholder="Ask anything you want..." 
        />
        <div className="marcus-model-picker">
          Marcus Model:
          <select>
            <option>Choose model</option>
          </select>
        </div>
        <div className="marcus-buttons">
          <button className="marcus-btn" type="button">Create Image</button>
          <button className="marcus-btn" type="button">Summarize Text</button>
          <button className="marcus-btn" type="button">Surprise Me</button>
          <button className="marcus-btn" type="button">Make a plan</button>
          <button className="marcus-btn" type="button">More</button>
        </div>
      </form>
    </main>
  );
};

export default MarcusMain;
