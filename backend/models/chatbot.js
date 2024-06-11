const mongoose = require('mongoose');

const schemaDefinition = {
  title: [{
    type: String,
    required: true
  }],
  options: [{
    type: String,
    required: true
  }]
};

const chatSchema = new mongoose.Schema({
  chatinit: schemaDefinition,
  Profile: schemaDefinition,
  Account: schemaDefinition,
  Privacy: schemaDefinition,
  Cart: schemaDefinition,
  Support: schemaDefinition
});

const ChatbotModel = mongoose.model('chatbot', chatSchema);

module.exports = ChatbotModel;