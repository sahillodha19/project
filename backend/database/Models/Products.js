const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: false
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  stock_quantity: {
    type: Number,
    required: true,
    min: 0
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
