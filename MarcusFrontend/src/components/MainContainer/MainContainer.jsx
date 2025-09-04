import React from 'react';
import Header from '../Header/Header';
import Roadmap from '../Roadmap/Roadmap';
import ChatPanel from '../ChatPanel/ChatPanel';
import MetricsPanel from '../MetricsPanel/MetricsPanel';
import './MainContainer.css';

const MainContainer = () => (
<div className="main-bg">
  <Header />
  <div className="dashboard-content">
    <Roadmap />
    <div className="dashboard-row">
      <ChatPanel />
      <MetricsPanel />
    </div>
  </div>
</div>


);

export default MainContainer;
