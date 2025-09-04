import React from 'react';
import './MetricsPanel.css';

const MetricsPanel = () => (
  <div className="metrics-panel">
    <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
      <button className="metrics-btn active">Preview</button>
      <button className="metrics-btn">Code</button>
    </div>
    <div className="metrics-box">
      <div className="metrics-title">Business Metrics</div>
      <div className="metrics-row">
        <div className="metrics-item">
          <span className="metrics-highlight">$2.4M</span>
          <span className="metrics-label">Monthly Revenue</span>
        </div>
        <div className="metrics-item">
          <span className="metrics-highlight">23.5%</span>
          <span className="metrics-label">Growth Rate</span>
        </div>
      </div>
    </div>
    <div className="insights-box">
      <div className="insights-title">AI Insights</div>
      <ul className="insights-list">
        <li>Revenue growth accelerating in Q4</li>
        <li>Employee productivity up 15%</li>
        <li>New market opportunity identified</li>
      </ul>
    </div>
  </div>
);

export default MetricsPanel;
