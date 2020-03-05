let Blog = require("./Blog.js").Blog;
let { authenticate } = require("../../middleware/authenticate");
let _ = require("lodash");
let path = require("path");


module.exports = function (app, express) {

    let BlogApi = express.Router();
    // Create new blog
    BlogApi.post("/", authenticate, (req, res) => {
        let body = _.pick(req.body, ['title', 'image', '_author', 'body', 'tags']);
        body.date = new Date();
        let blog = new Blog(body);
        console.log("In Blog API END POINT")
        console.log(body);
        blog.save().then((blog) => {
            Blog.populate(blog, { path: "_author" }, function (err, blog) {
                res.status(200).send({
                    success: true,
                    message: "Created Blog",
                    blog: blog
                })

            })
        }).catch((e) => {
            res.status(400).send({
                success: false,
                message: "Blog not created",
                error: e
            })
        })
    });

    BlogApi.get("/blogs", function (req, res) {
        console.log("Get Blog Called?")
        // console.log(req.body);

        Blog.find().sort('-date').populate("_author").exec(function (err, blogs) {
            if (err) console.log(err);
            //console.log(blog);
            res.status(200).send({
                success: true,
                message: "Blogs retrieved",
                blogs: blogs
            })
        })
    })

    BlogApi.get("/blogs/:limit", function (req, res) {
        console.log("Get Blog Called?")
        console.log("Limit: ", req.params.limit);
        // console.log(req.body);

        Blog.find().sort('-date').limit(parseInt(req.params.limit)).populate("_author").exec(function (err, blogs) {
            if (err) console.log(err);

            res.status(200).send({
                success: true,
                message: "Blogs retrieved",
                latest_blogs: blogs
            })
        })
    })


    BlogApi.get("/:id", function (req, res) {
        Blog.findById(req.params.id)
            .populate("_author")
            .exec(function (err, blog) {
                if (err) {
                    console.log("Error Occured", err)
                    res.status(400).send({
                        success: false,
                        message: "Did NotRetrieved Single Blog",
                        error: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Retrieved Single Blog",
                        blog: blog
                    })
                }
            })
    })


    BlogApi.post("/blog/blog-pic", authenticate, (req, res) => {

        // console.log("The body is ", req.user._id);

        // var mykey = crypto.createCipher('aes-128-cbc', 'password');
        // var mystr = mykey.update('abc', 'utf8', 'hex')
        //console.log("mystr is", mystr)
        // mystr += mykey.update.final('hex');
        // console.log(req.body)
        var pa = req.body.blog_id;// + mystr.split(".")[0];
        
        var base64Data = req.body.image.split(",")[1];//(/^data:image\/png;base64,/, "");

        require("fs").writeFile(path.join(__dirname, "../../../public/uploads/blogs/" + pa + ".png"), base64Data, 'base64', function (err) {
            console.log(err);

            Blog.findById(pa, function (err, blog) {
                console.log("Found??")
                blog.image = "uploads/blogs/" + pa + ".png";

                blog.save().then((blog) => {
                    res.status(200).send({
                        success: true,
                        message: "Image Update",
                        blog: blog
                    })
                }, (err)=>{
                    console.log("ERRE", err)
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

    return BlogApi;

}