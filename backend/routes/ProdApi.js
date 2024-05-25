const express = require('express')

const app = express();
app.use(express.json());
app.use(cors());
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Navid:NavidShopMy@shopmycluster.fe5vuty.mongodb.net/ShopMy?retryWrites=true&w=majority&appName=ShopMyCluster');

let ProductModel = require('./models/Products')

app.get('/getProducts', async (req, res) => {
    try {
        const result = await ProductModel.find({});
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})


app.listen(3001, (error) => {
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ 3001) 
    else 
        console.log("Error occurred, server can't start", error); 
    }
)