import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, clearCart } from '../Store/CartSlice';
import Button from '@mui/material/Button';

const AddToCart = ({ product }) => {  const dispatch = useDispatch();
   const cart = useSelector(state => state.cart);
   const [item, setItem] = useState({...product})
   const addToCartHandler = async () => {
     await dispatch(addItemToCart(item));
     console.log(cart);
    //  localStorage.setItem('cart', JSON.stringify(cart));
   };
 
   const removeFromCartHandler = () => {
     dispatch(removeItemFromCart(product._id));
    //  localStorage.setItem('cart', JSON.stringify(cart));
   };
   const cartItem = cart.items.find(item => item._id === product._id);
   const circleButtonStyle = {
      minWidth: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#f5f5f5', // light grey
      color: '#333',
      transition: 'background-color 0.3s',
    };
    const hoverStyle = {
      '&:hover': {
        backgroundColor: '#e0e0e0', // darker grey on hover
      },
    };
  return (
   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
   <>
      {cartItem ? (
        <>
          <Button onClick={removeFromCartHandler}  variant="contained" sx={{ ...circleButtonStyle, ...hoverStyle }}>-</Button>
          <span>{cartItem.quantity}</span>
          <Button onClick={addToCartHandler} variant="contained"  sx={{ ...circleButtonStyle, ...hoverStyle }}>+</Button>
        </>
      ) : (
        <Button onClick={addToCartHandler}>Add to Cart</Button>
      )}
   </>
   </div>
  )
}

export default AddToCart