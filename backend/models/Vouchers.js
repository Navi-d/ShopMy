const mongoose = require('mongoose')

const VoucherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    }
});

//model("table/document name", SchemaObject);
const VoucherModel = mongoose.model("vouchers", VoucherSchema)

//for the import for next js file
module.exports = VoucherModel;
