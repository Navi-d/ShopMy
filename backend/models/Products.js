const { Int32, Decimal128 } = require('mongodb');
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
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
const ProductModel = mongoose.model("products", ProductSchema)

//for the import for next js file
module.exports = ProductModel;
