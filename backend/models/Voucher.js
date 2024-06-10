const mongoose = require('mongoose');


const VoucherSchema = new mongoose.Schema({
  code: {
      type: String,
      required: true
  },
  discount: {
      type: Number,
      required: true
  },
  expiryDate: {
      type: Date,
      required: true
  }
});

const Voucher = mongoose.model('vouchers', VoucherSchema);
module.exports = Voucher;
