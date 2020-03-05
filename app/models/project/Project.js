const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");


var ProjectSchema = mongoose.Schema({
    pid: {type: String, required: true},
    status: {type: String, enum: ["in process", "completed"], default: "in process"},
    date: Date,
    manager: {type: Schema.Types.ObjectId, ref: 'User'},
    user: {type:Schema.Types.ObjectId, ref: 'User', required: true},
    service: {type: String, required: true, minlength: 1},
    title: String
})

var Project = mongoose.model('Project', ProjectSchema);
module.exports = {
  Project
}





