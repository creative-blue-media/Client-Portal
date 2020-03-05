let AdminMessage = require("./AdminMessage.js").AdminMessage;
let { authenticate } = require("../../middleware/authenticate");
let _ = require("lodash");



module.exports = function (app, express) {

    let AdminMessageApi = express.Router();
    // Create new adminMessage
    AdminMessageApi.post("/", authenticate, (req, res) => {
        let body = _.pick(req.body, ['title', 'image', '_author', 'body', 'tags']);
        body.date = new Date();
        let adminMessage = new AdminMessage(body);
        console.log("In AdminMessage API END POINT")
        console.log(body);
        adminMessage.save().then((adminMessage) => {
            AdminMessage.populate(adminMessage, { path: "_author" }, function (err, adminMessage) {
                res.status(200).send({
                    success: true,
                    message: "Created AdminMessage",
                    adminMessage: adminMessage
                })

            })
        }).catch((e) => {
            res.status(400).send({
                success: false,
                message: "AdminMessage not created",
                error: e
            })
        })
    });

    AdminMessageApi.get("/adminMessages", function (req, res) {
        console.log("Get AdminMessage Called?")
        // console.log(req.body);

        AdminMessage.find().sort('-date').populate("_author").exec(function (err, adminMessages) {
            if (err) console.log(err);
            //console.log(adminMessage);
            res.status(200).send({
                success: true,
                message: "AdminMessages retrieved",
                adminMessages: adminMessages
            })
        })
    })

    AdminMessageApi.get("/adminMessages/:limit", function (req, res) {
        console.log("Get AdminMessage Called?")
        console.log("Limit: ", req.params.limit);
        // console.log(req.body);

        AdminMessage.find().sort('-date').limit(parseInt(req.params.limit)).populate("_author").exec(function (err, adminMessages) {
            if (err) console.log(err);

            res.status(200).send({
                success: true,
                message: "AdminMessages retrieved",
                latest_adminMessages: adminMessages
            })
        })
    })


    AdminMessageApi.get("/:id", function (req, res) {
        AdminMessage.findById(req.params.id)
            .populate("_author")
            .exec(function (err, adminMessage) {
                if (err) {
                    console.log("Error Occured", err)
                    res.status(400).send({
                        success: false,
                        message: "Did NotRetrieved Single AdminMessage",
                        error: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Retrieved Single AdminMessage",
                        adminMessage: adminMessage
                    })
                }
            })
    })

    return AdminMessageApi;

}