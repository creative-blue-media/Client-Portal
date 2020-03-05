let User = require("./user.js").User;
let { authenticate } = require("../../middleware/authenticate");
let _ = require("lodash");
var path = require('path');

// let crypto = require("crypto");



module.exports = function (app, express) {

    let userApi = express.Router();
    // Create new user
    userApi.post("/", (req, res) => {
        let body = _.pick(req.body, ['email', 'fullName', 'password']);
        let user = new User(body);
        user.username = user.fullName;

        user.save().then((user) => {
            console.log("Calling generateAuthToken");
            return user.generateAuthToken();
        }).then((token) => {
            console.log("Token created", token);
            res.status(200).send({
                success: true,
                message: "Login Success",
                token: token,
                user: user
            });
        }).catch((e) => {
            console.log(e);
            res.status(400).send(e);
        })
    });

    userApi.get("/user", function (req, res) {
        console.log("at /user");
        // console.log(req.body);
        console.log(req.user)
        // User.find({ _id: req.user }, function (err, user) {
        //     if (err) console.log(err);
        //     //console.log(user);
        //     User.populate(user, { path: "manager" }, function (err, user) {
        //         let freqEnums = User.schema.path('frequency').enumValues;
        //         res.status(200).send({
        //             success: true,
        //             message: "User retrieved",
        //             user: user,
        //             freqEnums: freqEnums
        //         })
        //     })
        // })
        // res.status(200).send({
            
        // })
    })

    userApi.put("/user/update", authenticate, function (req, res) {
        console.log("Called Update User")
        var body = _.pick(req.body, ['email', 'password', 'firstName', 'fullName', 'lastName', 'address', 'frequency', 'strain', 'preference', 'bio', 'saved_blogs']);
        console.log("Body is: ", body);
        console.log("USER ", req.user._id)
        User.findById(req.user._id, function (err, user) {
            if (err || !user) return res.status(404).send({
                success: false,
                message: "Not Found",

            });
            // console.log("THE USER", user);

            user.firstName = body.firstName;
            user.lastName = body.lastName;
            user.address = body.address;
            user.email = body.email;
            user.frequency = body.frequency;
            user.strain = body.strain;
            user.preference = body.preference;
            user.bio = body.bio;
            user.username = body.username;
            user.saved_blogs = body.saved_blogs;
            user.save().then((user) => {
                User.populate(user, { path: "manager" }, function (err, user) {
                    res.status(200).send({
                        success: true,
                        message: "User retrieved",
                        user: user
                    })
                })
            }, (err) => {
                console.log("An error occured", err);
            })

        })
    })

    // user log in
    userApi.post("/login", (req, res) => {
        var body = _.pick(req.body, ['email', 'password']);
        console.log("In login", body);

        // User.findByCredentials(body.email, body.password).then((user) => {
        //     return user.generateAuthToken().then((token) => {

        //         res.header("x-auth", token).send({
        //             success: true,
        //             message: "Login Success",
        //             token: token,
        //             user: user
        //         });

        //         // console.log("Token is: ", token);
        //     });
        // }).catch((e) => {
        //     res.status(400).send({
        //         success: false,
        //         message: "Login Unsuccessful",
        //         error: e
        //     });
        // });
    });

    // user sign off
    userApi.delete("/user/remove/token/", authenticate, (req, res) => {
        console.log("In remove token");
        req.user.removeToken(req.token).then(() => {
            res.status(200).send({
                success: true,
                message: "Token Removed"
            });
        }).catch((e) => {
            res.status(400).send({
                success: false,
                message: "Token Not removed",
                error: e
            });
        })
    })

    // var storage = multer.diskStorage({
    //     destination: "public/uploads"
    // });
    // var upload = multer({
    //     storage: storage
    // }).any();


    userApi.delete("/user/:user_id/remove/saved-blog/:blog_id", (req, res) => {
        console.log("Req Body: ", req.params);
        console.log("I am in delete post and userid is", req.params.user_id)

        User.findById(req.params.user_id, function (err, user) {

            if (err) {
                console.log("There was an err", err);
            }
            let saved_blogs = user.saved_blogs;
            console.log("The blogs are is", saved_blogs);
            let ind = saved_blogs.indexOf(req.params.blog_id);
            if (ind > -1) {

                saved_blogs.splice(ind, 1);
                console.log("blogs afeer", saved_blogs);
            }
            user.saved_blogs = saved_blogs;

            user.save().then((user) => {
                User.populate(user, { path: "saved_blogs" }, function (err, user) {
                    res.status(200).send({
                        success: true,
                        message: "User retrieved",
                        user: user
                    })
                })
            }, (err) => {
                console.log("An error occured", err);
            })
        })


    })



    userApi.post("/user/profile-pic", authenticate, (req, res) => {

        // console.log("The body is ", req.user._id);

        // var mykey = crypto.createCipher('aes-128-cbc', 'password');
        // var mystr = mykey.update('abc', 'utf8', 'hex')
        //console.log("mystr is", mystr)
        // mystr += mykey.update.final('hex');
        var pa = req.user.username;// + mystr.split(".")[0];

        var base64Data = req.body.image.split(",")[1];//(/^data:image\/png;base64,/, "");

        // var appDir = path.dirname(require.main.filename);
        console.log("path", __dirname)

        require("fs").writeFile(path.join(__dirname, "../../../public/uploads/" + pa + ".png"), base64Data, 'base64', function (err) {
            console.log(err);

            User.findById(req.user._id, function (err, user) {
                user.image = "uploads/" + pa + ".png";

                user.save().then((user) => {
                    res.status(200).send({
                        success: true,
                        message: "Image Update",
                        user: user
                    })
                })
            })


        });
        // upload(req, res, function(err){
        //     if(err){
        //         console.log("there was an error uploading");
        //     }else{
        //         console.log("FILE UPLOADED SUCCESSFULLY");
        //     }
        // })
    })

    return userApi;

}
