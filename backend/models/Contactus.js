
const mongoose = require('mongoose')

const ContactusSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

//model("table/document name", SchemaObject);
const ContactusModel = mongoose.model("contact-us", ContactusSchema)

//for the import for next js file
module.exports = ContactusModel;
