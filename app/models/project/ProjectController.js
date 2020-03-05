let Project = require("./Project.js").Project;
let { authenticate } = require("../../middleware/authenticate");
let model = {};
let ObjectId = require('mongoose').Types.ObjectId;
model.User = require('../user/user.js').User;
let _ = require("lodash");



module.exports = function (app, express) {

    let ProjectApi = express.Router();
    // Create new project
    ProjectApi.post("/", authenticate, (req, res) => {
        let body = req.body//_.pick(req.body, ['title', 'service']);
        body.date = new Date();
        let project = new Project(body);
        project.status = "in process";
        project.manager = null;
        project.pid = project.title + Math.floor(Math.random()*100) + 1; // this is temporary 
        
        console.log("Ob", ObjectId(project.user));
        model.User.findById(project.user, function(err, user) {
            project.user = user;

            project.save().then((project) => {
            Project.populate(project, { path: "user" }, function (err, project) {
                res.status(200).send({
                    success: true,
                    message: "Created Project",
                    project: project
                })
            });

            }).catch((e) => {
                res.status(400).send({
                    success: false,
                    message: "Project not created",
                    error: e
                })
            })
        });

        
        
    });

    ProjectApi.get("/:user_id", function (req, res) {
        console.log("Geting All projects for user")
        // console.log(req.body);

        Project.find({ user: req.params.user_id }).populate("user").exec(function (err, projects) {
            if (err) console.log(err);
            //console.log(project);
            res.status(200).send({
                success: true,
                message: "Projects retrieved",
                projects: projects
            })
        })
    })

    ProjectApi.get("/:id", function (req, res) {
        Project.findById(req.params.id)
            .populate("manager")
            .exec(function (err, project) {
                if (err) {
                    console.log("Error Occured", err)
                    res.status(400).send({
                        success: false,
                        message: "Did NotRetrieved Single Project",
                        error: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Retrieved Single Project",
                        project: project
                    })
                }
            })
    })

    return ProjectApi;

}