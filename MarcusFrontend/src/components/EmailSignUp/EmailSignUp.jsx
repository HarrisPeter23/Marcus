import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../SignIn/SignIn.css';

const EyeIcon = ({ open }) => (
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.61 10.61 0 0 1 12 19c-7 0-11-7-11-7a17.15 17.15 0 0 1 2.76-4.28"></path>
      <path d="M1 1l22 22"></path>
      <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24"></path>
    </svg>
  )
);

const EmailSignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [step, setStep] = useState(1); // 1 = email, 2 = OTP, 3 = complete signup
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1: Email submission
  const onSubmitEmail = (data) => {
    setEmail(data.email);
    setStep(2);
    reset(); // Clear form for next step
    console.log('Sending OTP to:', data.email);
  };

  // Step 2: OTP verification
  const onSubmitOTP = (data) => {
    console.log('Verifying OTP:', data.otp);
    setStep(3);
    reset(); // Clear form for next step
  };

  // Step 3: Complete signup
  const onSubmitCompleteSignup = (data) => {
    console.log('Creating account:', {
      email: email,
      username: data.username,
      password: data.password
    });
    
    // Redirect to chat interface after successful signup
    navigate('/chat');
  };

  const handleBackToEmail = () => {
    setStep(1);
    reset();
  };

  const handleBackToOTP = () => {
    setStep(2);
    reset();
  };

  const password = watch('password', '');

  return (
    <div className="auth-content">
      <div className="heart">{/* Logo here if needed */}</div>
      
      {/* Step 1: Email */}
      {step === 1 && (
        <>
          <h2>Create your account</h2>
          <p className="desc">Enter your email to get started</p>

          <form onSubmit={handleSubmit(onSubmitEmail)}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: { 
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                  message: 'Invalid email address' 
                },
              })}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

            <button type="submit" className="white-btn">Continue</button>
          </form>
        </>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <>
          <h2>Verify OTP</h2>
          <p className="desc">We sent a 6-digit code to {email}</p>

          <form onSubmit={handleSubmit(onSubmitOTP)}>
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              maxLength="6"
              {...register('otp', {
                required: 'OTP is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Please enter a valid 6-digit code'
                }
              })}
            />
            {errors.otp && <p style={{ color: 'red' }}>{errors.otp.message}</p>}

            <button type="submit" className="white-btn">Continue</button>
          </form>

          <div className="footer" style={{ marginTop: '16px' }}>
            <button 
              type="button" 
              onClick={handleBackToEmail}
              style={{
                background: 'none',
                border: 'none',
                color: '#cdc7ff',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '1rem'
              }}
            >
              Change email address
            </button>
          </div>

          <div className="footer" style={{ marginTop: '8px' }}>
            Didn't receive a code? <a href="#" style={{ color: '#cdc7ff', textDecoration: 'underline' }}>Resend</a>
          </div>
        </>
      )}

      {/* Step 3: Complete Signup */}
      {step === 3 && (
        <>
          <h2>Complete your account</h2>
          <p className="desc">Create your username and password</p>

          <form onSubmit={handleSubmit(onSubmitCompleteSignup)}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters'
                }
              })}
            />
            {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain uppercase, lowercase, and number'
                  }
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: '#c4bdff',
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

            <label>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value =>
                    value === password || 'Passwords do not match',
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: '#c4bdff',
                }}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}

            <button type="submit" className="white-btn">Create Account</button>
          </form>

          <div className="footer" style={{ marginTop: '16px' }}>
            <button 
              type="button" 
              onClick={handleBackToOTP}
              style={{
                background: 'none',
                border: 'none',
                color: '#cdc7ff',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '1rem'
              }}
            >
              Back to OTP verification
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailSignUp;
