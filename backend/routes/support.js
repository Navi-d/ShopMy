const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Chatbot = require('../models/chatbot')
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
        const result = await Chatbot.find();
        
        console.log("ChatbotModel Data Sent")
        // res.json(result)
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

const {ObjectId} = mongoose.Types
/// Define a route to get the chatbot data
router.get('/chatbot', async (req, res) => {
  try {
    const chatbotId = '666735a8b5acc878775859ec';
    const chatbotData = await Chatbot.findOne({ '_id': new ObjectId(chatbotId) }).exec();

    if (!chatbotData) {
      return res.status(404).send({ error: 'Chatbot data not found' });
    }

    res.json(chatbotData);
  } catch (err) {
    console.error('Error fetching chatbot data:', err);
    res.status(500).send({ error: 'Failed to fetch chatbot data' });
  }
});


module.exports = router;