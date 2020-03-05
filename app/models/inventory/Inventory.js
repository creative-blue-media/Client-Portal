
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");


var InventorySchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, default: "images/blog/6.jpg" },
    date: Date,
    cost: Number,
    unit: Number,
    _creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    quantity_sold: { type: Number, required: true, default: 0 },
    strain: String,
    tags: [{ type: String}]
})

var Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = {
    Inventory
}





