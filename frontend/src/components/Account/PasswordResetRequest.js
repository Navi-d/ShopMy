import React, { useState } from 'react';
import axios from 'axios';

function PasswordResetRequest() {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/resetPasswordRequest', { email });
      setAlert({ type: 'success', message: 'Password reset instructions sent to your email' });
    } catch (error) {
      console.error(error);
      setAlert({ type: 'danger', message: 'Failed to send password reset instructions' });
    }
  };

  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
      <div className="card text-center" style={{ width: '300px' }}>
        <div className="card-header h5 text-white bg-primary">Password Reset</div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your email address and we'll send you an email with instructions to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-outline">
              <input
                type="email"
                id="typeEmail"
                className="form-control my-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Reset password
            </button>
          </form>
          {alert && (
            <div className={`alert alert-${alert.type} mt-3`} role="alert">
              {alert.message}
            </div>
          )}
          <div className="d-flex justify-content-between mt-4">
            <a href="/login">Login</a>
            <a href="/signup">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetRequest;
