import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Changed import
import axios from 'axios';

function PasswordReset() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate(); // Changed hook

  useEffect(() => {
    if (alert) {
      const timeoutId = setTimeout(() => {
        navigate('/login'); // Changed navigation
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [alert, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/resetPassword', { token, newPassword });
      setAlert({ type: 'success', message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      setAlert({ type: 'danger', message: 'Failed to reset password' });
    }
  };

  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
      <div className="card text-center" style={{ width: '300px' }}>
        <div className="card-header h5 text-white bg-primary">Reset Password</div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your new password below to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-outline">
              <input
                type="password"
                id="typeNewPassword"
                className="form-control my-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Reset Password
            </button>
          </form>
          {alert && (
            <div className={`alert alert-${alert.type} mt-3`} role="alert">
              {alert.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
