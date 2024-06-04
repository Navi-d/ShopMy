<<<<<<< HEAD
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
=======

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
>>>>>>> 8de9aec165486f536382fe466ac0a59b9155a93e
        type: String,
        required: true
    }
});

//model("table/document name", SchemaObject);
const ContactusModel = mongoose.model("contact-us", ContactusSchema)

//for the import for next js file
<<<<<<< HEAD
module.exports = ContactusModel;
=======
module.exports = ContactusModel;
>>>>>>> 8de9aec165486f536382fe466ac0a59b9155a93e
