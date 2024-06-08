const express = require('express');
const router = express.Router();
const UserModel = require('../models/Users');
const ProductModel = require('../models/Products');

// Add product to cart
router.post('/addToCart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let user = await UserModel.findById(userId);

    if (user) {
      const productIndex = user.cart.findIndex(p => p.productId.toString() === productId);

      if (productIndex > -1) {
        user.cart[productIndex].quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }

      await user.save();
      res.status(200).json(user.cart);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error });
  }
});

// Remove product from cart
router.post('/removeFromCart', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let user = await UserModel.findById(userId);

    if (user) {
      user.cart = user.cart.filter(p => p.productId.toString() !== productId);
      await user.save();
      res.status(200).json(user.cart);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error });
  }
});

// Update product quantity in cart
router.post('/updateQuantity', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let user = await UserModel.findById(userId);

    if (user) {
      const productIndex = user.cart.findIndex(p => p.productId.toString() === productId);

      if (productIndex > -1) {
        user.cart[productIndex].quantity = quantity;
        await user.save();
        res.status(200).json(user.cart);
      } else {
        res.status(404).json({ message: 'Product not found in cart' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product quantity', error });
  }
});



// Get user's cart
router.get('/getCart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId).populate('cart.productId');
    if (user) {
      res.status(200).json(user.cart);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching cart:', error); // Log the error here
    res.status(500).json({ message: 'Error getting cart', error });
  }
});

// Clear cart
router.post('/clearCart', async (req, res) => {
  const { userId } = req.body;

  try {
    let user = await UserModel.findById(userId);

    if (user) {
      user.cart = [];
      await user.save();
      res.status(200).json(user.cart);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
});

module.exports = router;