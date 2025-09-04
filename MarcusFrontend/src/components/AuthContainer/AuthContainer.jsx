import React, { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import EmailSignUp from '../EmailSignUp/EmailSignUp'; // import EmailSignUp
import './AuthContainer.css';

const AuthContainer = () => {
  // Possible values: 'signin', 'signup', 'emailSignup'
  const [view, setView] = useState('signin');

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

  return (
    <div className="auth-container">
      {view === 'signin' && <SignIn onSwitchToSignUp={switchToSignUp} />}
{view === 'signup' && (
  <SignUp 
    onSwitchToSignIn={switchToSignIn} 
    onSwitchToEmailSignUp={switchToEmailSignUp} 
  />
)}
      {view === 'emailSignup' && <EmailSignUp />}
    </div>
  );
};

export default AuthContainer;
