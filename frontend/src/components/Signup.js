import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5"> {/* Adjusted column width */}
              <div className="card" style={{borderRadius: "15px"}}>
                <div className="card-body p-4"> {/* Changed padding to p-4 */}
                  <h2 className="text-uppercase text-center mb-4">ShopyMy Account</h2>
                  <form>
                    <div className="form-outline mb-3">
                      <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                    </div>

                    <div className="form-outline mb-3">
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                    </div>

                    <div className="form-outline mb-3">
                      <input type="password" id="form3Example4cg" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                    </div>

                    <div className="form-outline mb-3">
                      <input type="password" id="form3Example4cdg" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                    </div>

                    

                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p className="text-center text-muted mt-4 mb-0">
                    Already have an account? <Link to="/login" style={{color: "#393f81"}}>Login here</Link>
                    </p>
                  </form>
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
