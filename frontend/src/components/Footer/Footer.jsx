import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h5>About Us</h5>
          <p>About Your Company</p>
          <p>Contact Us</p>
          <p>Careers</p>
        </div>
        <div className="footer-section">
          <h5>Customer Service</h5>
          <p>Order Tracking</p>
          <p>Returns & Refunds</p>
          <p>FAQs</p>
        </div>
        <div className="footer-section">
          <h5>Policies</h5>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Shipping Policy</p>
        </div>
        <div className="footer-section">
          <h5>Follow Us</h5>
          <a href="#" target="_blank">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" target="_blank">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#" target="_blank">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2023 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;