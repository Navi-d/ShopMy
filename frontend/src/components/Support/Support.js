import React from 'react'
import { Link } from 'react-router-dom';

export const Support = () => {
    return (
      <section className="support-wrapper">
        <div className="support-header">
          <img src="Products/images/support-header.png" alt="We are happy to help" className="support-background" />
          
        </div>
        <div className="support-options">
          <div className="support-card">
            <Link to="./ContactUs" className="support-link">
              <div className="support-icon">
                <img src="Products/images/contactus-icon.png" alt="Contact us" />
              </div>
              <div className="support-text">
                <h2>Contact us</h2>
                <p>Have a question or need assistance? Get in touch with our friendly support team for help.</p>
              </div>
            </Link>
          </div>
          <div className="support-card">
            <Link to="./Contactchatbot" className="support-link">
              <div className="support-icon">
                <img src="Products/images/chatbot-icon.png" alt="Contact chatbot" />
              </div>
              <div className="support-text">
                <h2>Contact chatbot</h2>
                <p>Need quick help? Connect with our chatbot for immediate support.</p>
              </div>
            </Link>
          </div>
          <div className="support-card">
            <Link to="./FAQ" className="support-link">
              <div className="support-icon">
                <img src="Products/images/FAQ-icon.png" alt="FAQs" />
              </div>
              <div className="support-text">
                <h2>FAQs</h2>
                <p>Looking for answers? Explore our FAQs to find solutions to common questions and concerns.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  };


export default Support
