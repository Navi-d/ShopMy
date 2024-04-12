const express = require('express')
const app = express();

const mongoose = require('mongoose')

const cors = require('cors')
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shopmy.official@gmail.com',
        pass: 'yfmkgsmrdkjlesjx' 
    }
});

// Generate random token
const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

app.post("/resetPasswordRequest", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = generateToken();
        
        // Save reset token and expiry date in user document
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send email with reset link
        const mailOptions = {
            from: 'shopmy.official@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) has requested to reset the password for your account. Please click on the following link to reset your password: http://localhost:3000/resetPassword/${resetToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Failed to send email" });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: "Email sent with password reset instructions" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/resetPassword", async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await UserModel.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Update password and clear reset token
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(3001, () => {
    console.log("server has started")
})