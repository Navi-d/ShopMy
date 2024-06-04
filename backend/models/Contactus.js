const mongoose = require('mongoose')

const ContactusSchema = new mongoose.Schema({
    productBrand: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    productLink: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    ratingValue: {
        type: String,
        required: true
    }
});

//model("table/document name", SchemaObject);
const ContactusModel = mongoose.model("contact-us", ContactusSchema)

//for the import for next js file
module.exports = ContactusModel;