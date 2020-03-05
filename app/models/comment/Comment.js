
const mongoose = require("mongoose");
const notify = require("../notification/Notification.js").Notification;
const Blog = require("../blog/Blog.js").Blog;
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");


var CommentSchema = mongoose.Schema({
    _author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, default: "images/users/3.jpg" },
    date: Date,
    body: { type: String, required: true, minlength: 1 },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    replied_to: { type: Schema.Types.ObjectId, ref: 'Comment', requried: false },
    tags: [{ type: String }]
});

// var notify = mongoose.model('Notification', NotificationSchema);
CommentSchema.pre('save', function (next) {

    console.log("In presave");
    console.log("Blog ID IS: ", this.blog);
    Blog.findById(this.blog, function (err, blog) {
        if (err) {
            console.log("Err: ", err);
        }
        console.log("Populated Blog is: ", blog);
        notify.create({
            "user": blog._author,
            "link": "#!/blog/" + blog._id,
            "subject": "User Commented on your blog",
            "date": this.date,
            "blog": blog
        }, function (err) {
            if (err) {
                console.log(err);
                return next();
            }
        });
    })



    console.log("Do I make it here??")

    next();
});


var Comment = mongoose.model('Comment', CommentSchema);
module.exports = {
    Comment
};


