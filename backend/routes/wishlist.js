const express = require('express');
const router = express.Router();
const UserModel = require('../models/Users');
const ProductModel = require('../models/Products');

// Add product to wishlist
router.post('/addToWishlist', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let user = await UserModel.findById(userId);

    if (user) {
      const productIndex = user.wishlist.findIndex(p => p.productId.toString() === productId);

      if (productIndex > -1) {
        res.status(400).json({ message: 'Product already in wishlist' });
      } else {
        user.wishlist.push({ productId });
        await user.save();
        res.status(200).json(user.wishlist);
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to wishlist', error });
  }
});

// Remove product from wishlist
router.post('/removeFromWishlist', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let user = await UserModel.findById(userId);

    if (user) {
      user.wishlist = user.wishlist.filter(p => p.productId.toString() !== productId);
      await user.save();
      res.status(200).json(user.wishlist);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from wishlist', error });
  }
});

// Get user's wishlist
router.get('/getWishlist/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId).populate('wishlist.productId');
    if (user) {
      res.status(200).json(user.wishlist);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting wishlist', error });
  }
});

module.exports = router;