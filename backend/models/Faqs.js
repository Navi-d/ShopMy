const mongoose = require('mongoose')

const FaqSchema = new mongoose.Schema({
    Question: {
        type: String,
    },
    Answer: {
        type: String,
    },
    
});

//model("table/document name", SchemaObject);
const FaqModel = mongoose.model("faqs", FaqSchema)

//for the import for next js file
module.exports = FaqModel;