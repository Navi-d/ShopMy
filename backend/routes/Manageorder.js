const express = require('express');
const router = express.Router();
const UserModel = require('../models/Users'); 
const TransactionModel = require('../models/transaction'); 
const ProductModel = require('../models/Products');

router.get('/:userId/orders', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)
      .populate({
        path: 'orders.items.productID',
        model: 'products',
        select: 'productTitle productLink productPrice'
      });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/:userId/orders/checkout', async (req, res) => {
  const { orders, totalPayment, paymentType, deliveryAddress } = req.body;

  try {
    const user = await UserModel.findById(req.params.userId);
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

    // clear cart
    user.cart = [];
    await user.save();

    const transaction = new TransactionModel({
      userId: req.params.userId,
      items: orders,
      totalPayment,
      paymentType,
      deliveryAddress
    });

    await transaction.save();

    res.status(200).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});


router.post('/:userId/orders/updateOrder', async (req, res) => {
  const { orderId, updateDetails } = req.body;

  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orderIndex = user.orders.findIndex((o) => o._id.toString() === orderId);
    if (orderIndex > -1) {
      Object.assign(user.orders[orderIndex], updateDetails);
      await user.save();
      res.status(200).json(user.orders);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});


router.post('/:userId/orders/deleteOrder', async (req, res) => {
  const { orderId } = req.body;

  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.orders = user.orders.filter((o) => o._id.toString() !== orderId);
    await user.save();
    res.status(200).json(user.orders);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
});


router.post('/:userId/orders/clearOrders', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.orders = [];
    await user.save();
    res.status(200).json(user.orders);
  } catch (error) {
    res.status(500).json({ message: 'Error clearing orders', error });
  }
});

module.exports = router;
