import React from 'react';
import './SignUp.css';

const SignUp = ({ onSwitchToSignIn, onSwitchToEmailSignUp }) => {
  const handleOAuthClick = (provider) => {
    alert(`${provider} auth placeholder`);
  };

  const GoogleIcon = () => (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path fill="#4285F4" d="M24 9.5c3.24 0 6.16 1.15 8.48 3.07l6.35-6.35C34.86 2.99 29.78 1 24 1 14.47 1 6.31 7.9 3.34 16.88l7.57 5.89C12.04 16.64 17.55 12.6 24 12.6z"/>
        <path fill="#34A853" d="M46.145 24.59c0-1.54-.15-3.03-.4-4.48H24v9.42h12.37c-.51 2.75-2.05 5.08-4.32 6.66l7.01 5.48c4.07-3.77 6.69-9.34 6.69-16.08z"/>
        <path fill="#FBBC05" d="M10.91 28.45a13.41 13.41 0 0 1 0-8.9l-7.58-5.89C1.55 17.63 0 20.68 0 24c0 3.32 1.55 6.37 3.33 8.34l7.58-5.89z"/>
        <path fill="#EA4335" d="M24 47c6.78 0 12.91-2.25 17.53-6.11l-7.01-5.48c-2.21 1.53-5.03 2.44-8.52 2.44-6.44 0-11.95-4.04-13.89-9.76l-7.58 5.89C6.31 40.1 14.47 47 24 47z"/>
      </g>
    </svg>
  );

  const AppleIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );

  const EmailIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );

  const GitHubIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#bbaaff" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0.2975C5.37 0.2975 0 5.675 0 12.3138c0 5.2863 3.4387 9.77 8.205 11.3525 0.6 0.11 0.82-0.26 0.82-0.5775 0-0.2875-0.01-1.045-0.015-2.055-3.3388 0.7425-4.0425-1.61-4.0425-1.61-0.5463-1.41-1.335-1.7875-1.335-1.7875-1.09-0.7575 0.0838-0.7425 0.0838-0.7425 1.205 0.085 1.8388 1.2725 1.8388 1.2725 1.07 1.83 2.805 1.3025 3.49 0.9963 0.11-0.775 0.4175-1.3025 0.7625-1.6025-2.665-0.3-5.4663-1.3625-5.4663-6.0643 0-1.34 0.465-2.435 1.235-3.295-0.1238-0.3013-0.5363-1.51 0.1175-3.1525 0 0 1.005-0.3225 3.3 1.2587 0.9575-0.27 1.985-0.41 3.005-0.415 1.02 0.005 2.05 0.145 3.01 0.415 2.29-1.58 3.295-1.2587 3.295-1.2587 0.655 1.6425 0.2425 2.8512 0.12 3.1525 0.77 0.86 1.235 1.955 1.235 3.295 0 4.7125-2.805 5.76-5.475 6.055 0.425 0.3725 0.805 1.11 0.805 2.2375 0 1.62-0.015 2.92-0.015 3.315 0 0.32 0.215 0.695 0.825 0.5775 4.765-1.5875 8.2-6.0663 8.2-11.35 0-6.6387-5.3725-12.016-12-12.016z"/>
    </svg>
  );

  return (
    <div className="auth-content">
      <div className="heart">
        {/* Uncomment and add your logo here */}
        {/* <img src="image.jpg" alt="Company Heart Logo" className="company-heart" /> */}
      </div>
      <h2>Sign up to Marcus</h2>
      <p className="desc">No waitlist—start creating now</p>
      <button 
        className="oauth-btn google" 
        onClick={() => handleOAuthClick('Google')}
        type="button"
      >
        <span className="icon google-icon">
          <GoogleIcon />
        </span>
        Sign up with Google
      </button>
      <button 
        className="oauth-btn apple" 
        onClick={() => handleOAuthClick('Apple')}
        type="button"
      >
        <span className="icon apple-icon">
          <AppleIcon />
        </span>
        Sign up with Apple
      </button>
      <button 
        className="oauth-btn github" 
        onClick={() => handleOAuthClick('GitHub')}
        type="button"
      >
        <span className="icon github-icon">
          <GitHubIcon />
        </span>
        Sign up with GitHub
      </button>
      <div className="or-divider">
        <span className="line"></span>
        <span className="or-text">or</span>
        <span className="line"></span>
      </div>
      <button 
        className="oauth-btn email" 
        onClick={onSwitchToEmailSignUp}
        type="button"
      >
        <span className="icon email-icon">
          <EmailIcon />
        </span>
        Continue with Email
      </button>
      <div className="footer">
        Already have an account? <a href="#" onClick={onSwitchToSignIn}>Sign in</a>
      </div>
    </div>
  );
};

export default SignUp;