const express = require('express');
const router = express.Router();
const Voucher = require('../models/Voucher');

// Route to get all vouchers
router.get('/getVoucher', async (req, res) => {
    try {
        const vouchers = await Voucher.find({});
        res.json(vouchers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to check if a voucher exists
router.get('/checkVoucher/:voucherCode', async (req, res) => {
    try {
        const voucherCode = req.params.voucherCode;
        const voucher = await Voucher.findOne({ code: voucherCode });

        if (voucher) {
            res.json({ exists: true, voucher });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
