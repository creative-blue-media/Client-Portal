
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");


var ShoppingcartSchema = mongoose.Schema({
    _customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Inventory'}],
    updated_at: Date,
})

var Shoppingcart = mongoose.model('Shoppingcart', ShoppingcartSchema);
module.exports = {
    Shoppingcart
}





