import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/authenticateUser', { email, password });
      console.log(response.data); // Assuming backend responds with user data
      localStorage.setItem('loggedInUser', JSON.stringify(response.data.user)); // Store user data in local storage
      setLoginSuccess(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoginError('Wrong email or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section className="vh-75 bg-image">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem", height: "663px" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="https://images.unsplash.com/photo-1511317559916-56d5ddb62563?q=80&w=2709&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", height: "661px" }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <img src="logo.png" alt="Logo" className="me-3" style={{ width: "150px", height: "150px", objectFit: "contain", borderRadius: "50%" }} />
                      </div>
                      <h5 className="mb-3 pb-3">Sign into your account</h5>
                      <div className="form-outline mb-4">
                        <input type="email" id="form2Example17" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label className="form-label" htmlFor="form2Example17">Email address</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="form2Example27" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label className="form-label" htmlFor="form2Example27">Password</label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                      </div>
                    </form>
                    <Link to="/resetPassword" className="small text-muted">Forgot password?</Link>
                    <p className="mb-5 pb-lg-2 text-muted">
                      Don't have an account? <Link to="/signup" style={{ color: "#393f81" }}>Register here</Link>
                    </p>

                    <Modal show={loginSuccess} onHide={() => setLoginSuccess(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title style={{ color: "green" }}>Success</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="text-center">
                        <p>Logged in successfully!</p>
                        {loading && <div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading...</span></div>}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setLoginSuccess(false)}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <Modal show={loginError} onHide={() => setLoginError('')}>
                      <Modal.Header closeButton>
                        <Modal.Title style={{ color: "red" }}>Error</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>{loginError}</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setLoginError('')}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
