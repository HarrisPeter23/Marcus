import React from "react";
import "./MarcusHeader.css";

const MarcusHeader = () => {
  return (
    <header className="marcus-header">
      <span className="marcus-logo">MARCUS</span>
      <div className="marcus-header-right">
        <button className="marcus-profile">Profile</button>
        <button className="marcus-settings"><span>⚙️</span></button>
      </div>
    </header>
  );
};

export default MarcusHeader;
