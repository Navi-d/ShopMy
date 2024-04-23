import React from 'react'
import '../Products/Home.css'
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div class="contact-wrapper home-wrapper-2 default-window-footer">
        <div class="contiainer-xxl p-5">
            <div class="row">
                <div class="col">
                    <div class="left-card">
                        <div class="d-block align-items-center">
                        <h2 className='my-4'><i class="fa fa-headphones fa-1x"></i> Contact Us</h2>
                        <p className='p-text'>
                            Need to get in touch with us? Either fill out the
                            form with your inquiry or find the department email you'd like
                            to contact below.
                        </p>
                    </div>
                    </div>
                    
                </div>

                <div class="col-4">
                    <div class="form-card shadow rounded-2 bg-white p-2">
                        <div class="d-flex">
                            <div className='m-2 '>
                                <form action="">
                                    <div class="form-group">
                                        <label for="text">First Name</label>
                                        <input type="text" 
                                        class="form-control bg-light" />
                                    </div>  
                                </form>
                            </div>

                            <div className='m-2 '>
                                <form action="">
                                    <div class="form-group">
                                        <label for="text">Last Name</label>
                                        <input type="text" 
                                        class="form-control bg-light" />
                                    </div>  
                                </form>   
                            </div>
                        </div>
                        
                        <div className='mx-2 '>
                            <form action="">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" 
                                    class="form-control bg-light" />
                                </div>  

                                <div class="form-group mb-2">
                                    <label for="email">What can we help you with?</label>
                                    <textarea type="textarea" rows={3} 
                                    class="form-control bg-light" />
                                </div>  

                                <Link className="btn btn-dark mb-2">Submit</Link>
                            </form>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUs
