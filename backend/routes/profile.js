const express = require('express');
const router = express.Router();
const UserModel = require('../models/Users');

// Save user data
router.post('/saveUser', async (req, res) => {
    try {
        const { userId, userData } = req.body;
        const { username, email, password, birthdate } = userData;
        const result = await UserModel.findOneAndUpdate(
            { _id: userId }, 
            { username: username, email: email, password: password, birthdate: birthdate },
            { new: true }
        );

        console.log("User Data Updated: " + email);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

// Add voucher to user
router.post('/addVoucher', async (req, res) => {
    const { userId, voucherId } = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (user) {
            // Check if the voucher already exists in the user's vouchers array
            const voucherExists = user.vouchers.some(v => v.voucherId.toString() === voucherId);

            if (voucherExists) {
                return res.status(400).json({ message: 'Voucher already exists for the user' });
            }

            // Add the voucher to the user's vouchers array
            user.vouchers.push({ voucherId });
            await user.save();

            res.status(200).json({ message: 'Voucher added successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding voucher to user', error });
    }
});

// Get user vouchers
router.get('/getUserVouchers/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById(userId).populate('vouchers.voucherId');

        if (user) {
            res.status(200).json(user.vouchers);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user vouchers', error });
    }
});

// Remove voucher from user
router.post('/removeVoucher', async (req, res) => {
    const { userId, voucherId } = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (user) {
            // Remove the voucher from the user's vouchers array
            let a = voucherId.toString()+" "+user.vouchers;
            user.vouchers = user.vouchers.filter(v => v._id.toString() !== voucherId);
            await user.save();

            res.status(200).json({ message: 'Voucher removed successfully '+a });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing voucher from user', error });
    }
});

module.exports = router;
