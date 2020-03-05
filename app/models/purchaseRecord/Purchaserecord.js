
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");


var PurchaserecordSchema = mongoose.Schema({
    _customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    purchase_total: Number,
    paid: Number,
    tax: Number,
    items: [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    updated: Date,
})

var Purchaserecord = mongoose.model('Purchaserecord', PurchaserecordSchema);
module.exports = {
    Purchaserecord
}





