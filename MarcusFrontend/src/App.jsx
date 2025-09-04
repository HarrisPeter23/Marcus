import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContainer from './components/AuthContainer/AuthContainer';
import ChatBox from '../ChatBox'; 
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import MarcusApp from './components/MarcusApp/MarcusApp';  // Import MarcusApp
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<AuthContainer />} /> 
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/marcus" element={<MarcusApp />} />  {/* Marcus route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
