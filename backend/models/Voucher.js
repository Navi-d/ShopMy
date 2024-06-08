const mongoose = require('mongoose');

const VoucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const Voucher = mongoose.model('vouchers', VoucherSchema);
module.exports = Voucher;
