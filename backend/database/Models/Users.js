const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  pwd: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  account_type: {
    type: String,
    enum: ['admin', 'customer', 'seller'],  // Assuming these roles
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  auth_type: {
    type: String,
  }
});

// Pre-save hook to update the `updated_at` field before saving
accountSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
