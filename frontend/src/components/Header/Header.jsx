import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const cart = useSelector(state => state.cart);
  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <img src="https://www.shutterstock.com/image-vector/creative-modern-abstract-ecommerce-logo-260nw-2134594701.jpg" alt="" />
        </a>
      </div>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/shop">Shop</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
    </nav>
      <div className="search-bar">
        <input type="text" placeholder="Search for products" />
        <button>Search</button>
      </div>
      <div className="user-actions">
        {
          localStorage.getItem('token')? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Signup</a>
            </>
          )
        }
        <Link to="/cart">
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="cart-count">{cart.totalQuantity}</span>
        </Link>
      </div>
    </header>
  );
};



const handleLogout = () => {
  localStorage.removeItem('token');
  window.location = "/login";
};

export default Header;