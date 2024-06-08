const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    items: [{
        _id: false,
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPayment: {
          type: mongoose.Schema.Types.Decimal128,
          required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    deliveryAddress: [{
        _id: false,
        address: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        },
        postcode: {
          type: String,
          required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const TransactionModel = mongoose.model('transaction', TransactionSchema);
module.exports = TransactionModel;