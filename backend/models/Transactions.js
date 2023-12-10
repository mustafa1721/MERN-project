const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  transaction_code: String,
  symbol: String,
  price: String,
  total: String
}, { _id: false });

const transactionsSchema = new mongoose.Schema({
  account_id: Number,
  transaction_count: Number,
  bucket_start_date: {
      type: Date
  },
  bucket_end_date: {
      type: Date
  },
  transactions: [transactionSchema]
});

const transactions = mongoose.model('transactions', transactionsSchema);

module.exports = transactions;
