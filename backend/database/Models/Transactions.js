const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  payment_type: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  payment_gateway: {
    type: String,
    required: false,
  },
  transaction_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    required: true
  }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
