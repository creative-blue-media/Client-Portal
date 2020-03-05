let Notification = require("./Notification.js").Notification;
let { authenticate } = require("../../middleware/authenticate");
let _ = require("lodash");
let path = require("path");


module.exports = function (app, express) {

    let NotificationApi = express.Router();
    // Create new notification
    NotificationApi.post("/", authenticate, (req, res) => {
        let body = _.pick(req.body, ['user', 'link', 'subject', 'date', 'blog']);
        body.date = new Date();
        let notification = new Notification(body);
        console.log("In Notification API END POINT")
        console.log(body);
        notification.save().then((notification) => {
            res.status(200).send({
                success: true,
                message: "Created Notification",
                notification: notification
            })


        }).catch((e) => {
            res.status(400).send({
                success: false,
                message: "Notification not created",
                error: e
            })
        })
    });

    NotificationApi.get("/user/:user_id", function (req, res) {
        console.log("Get Notification Called?")
        // console.log(req.body);

        Notification.find({ "user": req.params.user_id }, function (err, notifications) {
            if (err) console.log(err);
            //console.log(notification);
            res.status(200).send({
                success: true,
                message: "Notifications retrieved",
                notifications: notifications
            })
        })
    })

    NotificationApi.get("/notifications/:limit", function (req, res) {
        console.log("Get Notification Called?")
        console.log("Limit: ", req.params.limit);
        // console.log(req.body);

        Notification.find().sort('-date').limit(parseInt(req.params.limit)).populate("_author").exec(function (err, notifications) {
            if (err) console.log(err);

            res.status(200).send({
                success: true,
                message: "Notifications retrieved",
                latest_notifications: notifications
            })
        })
    })


    NotificationApi.get("/:id", function (req, res) {
        Notification.findById(req.params.id)
            .populate("_author")
            .exec(function (err, notification) {
                if (err) {
                    console.log("Error Occured", err)
                    res.status(400).send({
                        success: false,
                        message: "Did NotRetrieved Single Notification",
                        error: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Retrieved Single Notification",
                        notification: notification
                    })
                }
            })
    })

    return NotificationApi;

}