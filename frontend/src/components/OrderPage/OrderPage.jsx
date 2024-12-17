import React, { useState } from 'react';
import axios from 'axios';
import { Step, StepLabel, Stepper, Button, TextField, MenuItem } from '@mui/material';
import CartPage from '../CartPage/CartPage';
import { useDispatch, useSelector } from 'react-redux';

const OrderPage = () => {
  const cart = useSelector(state => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState({
    account_id: '672f612b6f7376f3d9add895',
    items: cart.items.map(({ _id, ...rest }) => ({
      product_id: _id,
      ...rest
    })),
    
    shipping_address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      pin: '',
      state: ''
    },
    shipping_method: 'Standard',
    payment_method: 'Credit Card',
    payment_transaction_id: 'rgergeg',
    discount: 0,
    tax_amt: 0,
    order_status: 'Pending',
  });

  const steps = ['Shipping Address', 'Order Details', 'Payment', 'Confirmation'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      shipping_address: { ...orderData.shipping_address, [name]: value },
    });
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/order/create', orderData);
      alert(response);
    } catch (error) {
      console.error(error);
      alert('Error creating order');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={orderData.shipping_address.addressLine1}
              onChange={handleAddressChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Address Line 2"
              name="addressLine2"
              value={orderData.shipping_address.addressLine2}
              onChange={handleAddressChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={orderData.shipping_address.city}
              onChange={handleAddressChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Pin"
              name="pin"
              type="number"
              value={orderData.shipping_address.pin}
              onChange={handleAddressChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="State"
              name="state"
              value={orderData.shipping_address.state}
              onChange={handleAddressChange}
              fullWidth
              margin="normal"
              required
            />
          </div>
        );
      case 2:
        return (
          <div>
            <TextField
              label="Payment Method"
              name="payment_method"
              select
              value={orderData.payment_method}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="PayPal">PayPal</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              <MenuItem value="Bank Transfer">COD</MenuItem>
            </TextField>
          </div>
        );
      case 1:
        return (
         
          <CartPage />
        );
        case 3:
         return(
            
          <div>
          <h4>Confirm Order Details</h4>
          <pre>{JSON.stringify(orderData, null, 2)}</pre>
        </div>
         )
      default:
        return null;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepContent(activeStep)}
      <div style={{ marginTop: 20 }}>
        {activeStep > 0 && (
          <Button onClick={handleBack} variant="contained" style={{ marginRight: 10 }}>
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
