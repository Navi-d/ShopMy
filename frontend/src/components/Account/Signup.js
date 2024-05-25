import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/createUser', { username, email, password });
      console.log(response.data); // Assuming backend responds with user data
      setSignupSuccess(true);
    } catch (error) {
      console.error(error);
      setSignupError('Error creating account. Please try again.');
    }
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4">
                  <h5 className="text-center mb-4">Create your ShopMy account</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-3">
                      <input type="text" id="form3Example1cg" className="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)} />
                      <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                    </div>

                    <div className="form-outline mb-3">
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                    </div>

                    <div className="form-outline mb-3">
                      <input type="password" id="form3Example4cg" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                    </div>

                    <div className="form-outline mb-3">
                      <input type="password" id="form3Example4cdg" className="form-control form-control-lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                    </div>
                  </form>
                  {signupError && <div className="alert alert-danger mt-3" role="alert">{signupError}</div>}
                  {signupSuccess && <div className="alert alert-success mt-3" role="alert">Successfully signed up!</div>}
                  <p className="text-center text-muted mt-4 mb-0" style={{ color: "#393f81" }}>
                    Already have an account? <Link to="/login" style={{ color: "#393f81" }}>Login here</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
