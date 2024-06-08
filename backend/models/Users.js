const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
<<<<<<< Updated upstream
    }, 
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String, // Add resetPasswordToken field
    resetPasswordExpires: Date // Add resetPasswordExpires field
=======
      }
    }
  ],
  orders: [
    { 
      status: {
        type: String,
        default: "Processing"
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
    }
  ]
>>>>>>> Stashed changes
});

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;
