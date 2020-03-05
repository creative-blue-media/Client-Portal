let Comment = require("./Comment.js").Comment;
let { authenticate } = require("../../middleware/authenticate");
let _ = require("lodash");



module.exports = function (app, express) {

    let CommentApi = express.Router();
    // Create new comment
    CommentApi.post("/", authenticate, (req, res) => {
        let body = _.pick(req.body, ['body', 'image', '_author', 'tags', 'reply_to', 'blog']);
        body.date = new Date();
        let comment = new Comment(body);

        console.log("In Comment API END POINT")
        console.log(body);

        comment.save().then((comment) => {
            Comment.populate(comment, { path: "_author" }, function (err, comment) {
                res.status(200).send({
                    success: true,
                    message: "Created Comment",
                    comment: comment
                })
            });

        }).catch((e) => {
            res.status(400).send({
                success: false,
                message: "Comment not created",
                error: e
            })
        })
    });

    CommentApi.get("/blog/:id", function (req, res) {
        console.log("Geting All comments for blog")
        // console.log(req.body);

        Comment.find({ blog: req.params.id }).populate("_author").exec(function (err, comments) {
            if (err) console.log(err);
            //console.log(comment);
            res.status(200).send({
                success: true,
                message: "Comments retrieved",
                comments: comments
            })
        })
    })

    CommentApi.get("/:id", function (req, res) {
        Comment.findById(req.params.id)
            .populate("_author")
            .exec(function (err, comment) {
                if (err) {
                    console.log("Error Occured", err)
                    res.status(400).send({
                        success: false,
                        message: "Did NotRetrieved Single Comment",
                        error: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Retrieved Single Comment",
                        comment: comment
                    })
                }
            })
    })

    return CommentApi;

}