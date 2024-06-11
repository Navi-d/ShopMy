const express = require('express');
const router = express.Router();
const ChatbotModel = require('../models/chatbot')
const FaqModel = require('../models/Faqs');

//Contactus
let ContactusModel = require('../models/Contactus');
const { error } = require('console');

router.get('/getContactus', async (req, res) => {
    try {
        const result = await ContactusModel.findById("usernameId");
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})

router.post('/postContactus', async (req, res) => {
    try {
        const {firstName, lastName, email, description} = req.body;
        const newContactUs = new ContactusModel({firstName, lastName, email, description});
        let result = await newContactUs.save();
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})

//faq
router.get('/getFaqs', async (req, res) => {
    FaqModel.find()
    .then(faqs => res.json(faqs))
    .catch(err => res.json(err))
})


router.get('/getChatbotData', async (req, res) => {
    try {
        const result = await ChatbotModel.find();
        
        console.log("ChatbotModel Data Sent")
        res.json({chatinit: {
            title: ["Hello I’m Mr. Chatbot, how can I help you?"],
            options: ["Profile", "Cart", "Support"]
          },
      
          Profile: {
            title: ["Please select what you're having problems with"],
            options: ["Account", "Privacy", "Others"],
          },
            Account: {
              title: ["Please clarify the problem"],
              options: ["Login Issues", "Update Information"]
            },
            Privacy: {
              title: ["What privacy issue are you facing?"],
              options: ["Data Access", "Data Deletion", "Data Sharing"]
            },
            
          Cart: {
            title: ["What issues are you having with your cart?"],
            options: ["Add Items", "Remove Items", "View Cart"]
          },
      
          Support: {
            title: ["How can we support you?"],
            options: ["Technical Support", "Login Issues", "General Inquiry"]
          }});
    } catch (error) {
        res.json(error);
    }
})


module.exports = router;