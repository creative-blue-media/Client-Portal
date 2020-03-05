
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");


var BlogSchema = mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, default: "images/blog/6.jpg"},
    date: Date,
    _author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    body: {type: String, required: true, minlength: 1},
    tags: [{type: String}]
})

var Blog = mongoose.model('Blog', BlogSchema);
module.exports = {
  Blog
}





