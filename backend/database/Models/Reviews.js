const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',  // Assuming users are stored in the Account schema
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review_text: {
    type: String,
    required: false
  },
  review_date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { timestamps: true });

const ProductReview = mongoose.model('ProductReview', productReviewSchema);

module.exports = ProductReview;
