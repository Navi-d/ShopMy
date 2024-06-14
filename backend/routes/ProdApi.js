const express = require('express');
const router = express.Router();
const UserModel = require('../models/Users');
const ProductModel = require('../models/Products');

router.get('/getProducts', async (req, res) => {
    try {
        const result = await ProductModel.find({});
        
        console.log("Products Data Sent")
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})

//Searching Query
router.get('/searchProduct/:query', async (req, res) => {
    try {
        const result = await ProductModel.find(
            {
                '$or': [
                    {productTitle: {$regex: req.params.query, $options: 'i'}},
                    {productBrand: {$regex: req.params.query, $options: 'i'}},
                ]
                
            }
        ).exec();
        
        console.log("Products Data Sent")
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})

router.get('/getProduct/:id', async (req, res) => {
    try {
        const result = await ProductModel.findById(req.params.id);
        console.log("Product Data Sent")
        if (!result) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})

router.get('/api/reportProduct/:id/:reported', async (req, res) => {
    try {
        const productId = req.params.id;
        const report = (req.params.reported);
        // const product = await ProductModel.findById(productId);
        const result = await ProductModel.findOneAndUpdate(
            {_id: productId},
            {reported : report}
        )


        console.log("Report Data Sent with report " + report)
        if (!result) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json("Reported total: " + report);
    } catch (error) {
        res.json(error);
    }
})
module.exports = router;