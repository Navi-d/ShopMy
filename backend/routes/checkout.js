const express = require('express');
const router = express.Router();
const UserModel = require('../models/Users');
const TransactionModel = require('../models/transaction');

// Create a new order (checkout)
router.post('/', async (req, res) => {
    const { userId, orders, totalPayment, paymentType, deliveryAddress } = req.body;
    
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newOrder = {
            items: orders,
            totalPayment,
            paymentType,
            deliveryAddress
        };

        user.orders.push(newOrder);
        await user.save();

        //clear cart
        user.cart = [];
        await user.save();

        const transaction = new TransactionModel({
            userId,
            items: orders,
            totalPayment,
            paymentType,
            deliveryAddress
        });
    
        // Save the transaction document
        await transaction.save();
        
        res.json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});


module.exports = router;