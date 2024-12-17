// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart') != undefined?JSON.parse(localStorage.getItem('cart')):{
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);

      state.totalQuantity++;
      state.totalAmount += newItem.price;

      if (!existingItem) {
        state.items.push({
          name: newItem.name,
          price: newItem.price,
          _id: newItem._id,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;

        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item._id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
