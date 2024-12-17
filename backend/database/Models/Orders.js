const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  order_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  total_amt: {
    type: Number,
    required: true
  },
  tax_amt: {
    type: Number,
    default: 0
  },
  shipping_cost: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  order_status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    required: true
  },
  items: [{
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    }
  }],
  shipping_address: {
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    pin: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  shipping_method: {
    type: String,
    enum: ['Standard', 'Expedited', 'Overnight'],
    required: true
  },
  shipping_cost: {
    type: Number,
    required: true
  },
  payment_status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    required: true
  },
  payment_method: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer'],
    required: true
  },
  payment_transaction_id: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
