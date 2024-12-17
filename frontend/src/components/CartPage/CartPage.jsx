import React, { useEffect } from 'react';
import './CartPage.css';
import { useSelector, useDispatch } from 'react-redux';
import AddToCart from '../AddToCart/AddToCart';
import { removeItemFromCart } from '../Store/CartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  // Function to handle item removal
  const removeItem = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  // Calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cart.items.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <div className="container">
      <h1>Your Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <table className="cart-items">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <AddToCart product={item} />
                  </td>
                  <td>${item.totalPrice.toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeItem(item._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-footer">
            <h2>Total Price: ${calculateTotalPrice().toFixed(2)}</h2>
            <Link to="/orderpage">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
