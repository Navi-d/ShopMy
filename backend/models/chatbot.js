const mongoose = require('mongoose');

const chatbotSchema = new mongoose.Schema({
  chatinit: {
    title: [String],
    options: [String]
  },
  Profile: {
    title: [String],
    options: [String]
  },
  Account: {
    title: [String],
    options: [String]
  },
  Privacy: {
    title: [String],
    options: [String]
  },
  Cart: {
    title: [String],
    options: [String]
  },
  Support: {
    title: [String],
    options: [String]
  }
});

const Chatbot = mongoose.model('Chatbot', chatbotSchema);

module.exports = Chatbot;
