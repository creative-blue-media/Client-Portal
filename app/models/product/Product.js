
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");


var ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, default: "images/blog/6.jpg" },
    date: Date,
    cost: Number,
    _customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true, minlength: 1 },
    type: String
})

var Product = mongoose.model('Product', ProductSchema);
module.exports = {
    Product
}





