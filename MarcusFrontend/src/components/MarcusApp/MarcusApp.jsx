import React from "react";
import MarcusHeader from "../MarcusHeader/MarcusHeader";
import MarcusMain from "../MarcusMain/MarcusMain";
import "./MarcusApp.css";

const MarcusApp = () => {
  return (
    <div className="marcus-app-wrapper">
      <div className="marcus-app">
        <MarcusHeader />
        <MarcusMain />
      </div>
    </div>
  );
};

export default MarcusApp;
