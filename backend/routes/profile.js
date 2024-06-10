const express = require('express');
const router = express.Router();
const UserModel = require('../models/Users');
const ProductModel = require('../models/Products');

router.post('/saveUser', async (req, res) => {
    try {
        const {userId, userData} = req.body;
        const {username, email, password} = userData;
        const result = await ProductModel.findOneAndUpdate(
            {_id : userId}, 
            
            {username: username, 
            email: email, 
            password: password});
        
        console.log("User Data Updated" + email)
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;