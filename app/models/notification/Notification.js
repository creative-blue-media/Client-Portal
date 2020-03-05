
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");


var NotificationSchema = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    link: String,
    date: Date,
    subject: String,
    blog: {
        type: Schema.Types.ObjectId, ref: 'Blog', required: true
    }
})

var Notification = mongoose.model('Notification', NotificationSchema);
module.exports = {
  Notification
}
