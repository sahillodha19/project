const express = require('express');
const Order = require('../database/Models/Orders.js');
const router = express.Router();
router.post('/create', async (req, res) => {
   try {
     const { account_id, items, shipping_address, shipping_method, payment_method, payment_transaction_id, discount = 0, taxes = 0, order_status } = req.body;
 
     // Validate required fields
     if (!account_id || !items || !shipping_address || !shipping_method || !payment_method || !payment_transaction_id) {
       return res.status(400).json({ message: 'All fields are required.' });
     }
 
     // Calculate the total order amount and individual item total prices
     let total_amt = 0;
     const orderItems = items.map(item => {
       const totalPrice = item.quantity * item.price;
       total_amt += totalPrice;
       return {
         product_id: item.product_id,
         name: item.name,
         quantity: item.quantity,
         price: item.price,
         totalPrice
       };
     });
 
     // Apply discount and taxes
     total_amt -= discount;  // Subtract discount
     total_amt += taxes;     // Add taxes
 
     // Shipping cost is already part of the request, add it to total amount
     total_amt += shipping_method === 'Standard' ? 5 : shipping_method === 'Expedited' ? 10 : 20;
 
     // Create the new order
     const newOrder = new Order({
       account_id,
       items: orderItems,
       total_amt,
       tax_amt: taxes,
       shipping_cost: shipping_method === 'Standard' ? 5 : shipping_method === 'Expedited' ? 10 : 20,
       discount,
       shipping_address,
       shipping_method,
       payment_status: 'Pending',
       payment_method,
       payment_transaction_id,
       order_status
     });
 
     // Save the order to the database
     await newOrder.save();
 
     // Return success response
     res.status(201).json({ message: 'Order created successfully', order: newOrder });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error, unable to create order' });
   }
 });

 module.exports = router;
 