import React, { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`sidebar${expanded ? " expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <i className="icon icon-logo"></i>
          {expanded && <span className="logo-text">Marcus</span>}
        </div>
        <button className="sidebar-btn active">
          <i className="icon icon-plus"></i>
          {expanded && <span>New chat</span>}
        </button>
        <button className="sidebar-btn">
          <i className="icon icon-chat"></i>
          {expanded && <span>Chats</span>}
        </button>
        <button className="sidebar-btn">
          <i className="icon icon-folder"></i>
          {expanded && <span>Projects</span>}
        </button>
      </div>
      {expanded && (
        <>
          <div className="sidebar-recents-label">Recents</div>
          <div className="sidebar-recents">
            <div className="sidebar-recent">Echo Interface Design Replication</div>
            <div className="sidebar-recent">ThinkAI Interface Clone</div>
            <div className="sidebar-recent">Professional Chatbot UI Design</div>
          </div>
        </>
      )}
      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">V</div>
          {expanded && (
            <div className="sidebar-user-details">
              <span>User</span>
              <span className="sidebar-user-plan">Free plan</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
