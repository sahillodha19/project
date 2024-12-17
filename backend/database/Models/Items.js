const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
