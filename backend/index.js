const express = require('express')
const app = express();

const mongoose = require('mongoose')

const cors = require('cors')

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://Navid:NavidShopMy@shopmycluster.fe5vuty.mongodb.net/ShopMy?retryWrites=true&w=majority&appName=ShopMyCluster');

const UserModel = require('./models/Users');

app.get("/getUsers", async (req, res) => {
    try {
        const result = await UserModel.find({});
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});
app.post("/createUser", async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user)
})

app.post("/authenticateUser", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email, password });
        if (user) {
            // Authentication successful
            res.json({ message: "Authentication successful", user });
        } else {
            // Authentication failed
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(3001, () => {
    console.log("server has started")
})