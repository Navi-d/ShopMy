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
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    ratingValue: {
        type: Number,
        required: true,
        default: 0
    },
    totalRatings: {
        type:Number,
        default: 0
    },
    reported: {
        type:Number,
        default: 0
    },
    stockCurrent: {
        type: Number,
        default: 50
    },
    stockMax: {
        type: Number,
        default: 100
    },
    specialProduct: {
        type: Boolean,
        default: false
    }
});

//model("table/document name", SchemaObject);
const ProductModel = mongoose.model("products", ProductSchema)

//for the import for next js file
module.exports = ProductModel;
