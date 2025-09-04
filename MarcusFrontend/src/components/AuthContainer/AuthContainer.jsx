import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import EmailSignUp from '../EmailSignUp/EmailSignUp'; 
import './AuthContainer.css';

const AuthContainer = () => {
  const [view, setView] = useState('signin');
  const navigate = useNavigate();

  const switchToSignUp = (e) => {
    e?.preventDefault();
    setView('signup');
  };

  const switchToSignIn = (e) => {
    e?.preventDefault();
    setView('signin');
  };

  const switchToEmailSignUp = (e) => {
    e?.preventDefault();
    setView('emailSignup');
  };

  // Function to navigate to Marcus page
  const navigateToMarcus = () => {
    navigate('/marcus');
  };

  return (
    <div className="auth-container">
      {view === 'signin' && (
        <SignIn 
          onSwitchToSignUp={switchToSignUp} 
          onSuccess={navigateToMarcus} 
        />
      )}
      {view === 'signup' && (
        <SignUp 
          onSwitchToSignIn={switchToSignIn} 
          onSwitchToEmailSignUp={switchToEmailSignUp} 
          onSuccess={navigateToMarcus} 
        />
      )}
      {view === 'emailSignup' && (
        <EmailSignUp onSuccess={navigateToMarcus} />
      )}
    </div>
  );
};

export default AuthContainer;
