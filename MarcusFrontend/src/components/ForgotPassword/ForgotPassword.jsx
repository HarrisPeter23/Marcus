import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = ({ onSwitchToSignIn }) => {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm();

  // Watch the new password field to compare with confirm password
  const watchNewPassword = watch('newPassword');

  const onSubmit = (data) => {
    // Implement your forgot password logic here
    console.log('Forgot password data:', data);
    
    // For now, just show success and redirect
    alert(`Password reset successful!\nEmail: ${data.email}`);
    
    // Redirect to sign-in page after successful reset
    navigate('/');
  };

  const handleBackToSignIn = (e) => {
    e.preventDefault();
    if (onSwitchToSignIn) {
      onSwitchToSignIn();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="forgot-content">
      <div className="heart">
        {/* Uncomment and add your logo here */}
        {/* <img src="image.jpg" alt="Company Heart Logo" className="company-heart" /> */}
      </div>
      
      <h2>Reset Password</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Enter a valid email address'
            }
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>OTP</label>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          maxLength="6"
          {...register('otp', {
            required: 'OTP is required',
            pattern: {
              value: /^\d{6}$/,
              message: 'OTP must be 6 digits'
            }
          })}
        />
        {errors.otp && <p className="error">{errors.otp.message}</p>}

        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          {...register('newPassword', {
            required: 'New password is required',
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
        {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === watchNewPassword || 'Passwords do not match'
          })}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

        <button type="submit" className="reset-btn">
          Reset Password
        </button>
      </form>

      <div className="footer">
        Remember your password? <a href="#" onClick={handleBackToSignIn}>Sign in</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
