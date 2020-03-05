let Product = require("./Product.js").Product;
let { authenticate } = require("../../middleware/authenticate");
let _ = require("lodash");



module.exports = function (app, express) {

    let ProductApi = express.Router();
    // Create new product
    ProductApi.post("/", authenticate, (req, res) => {
        let body = _.pick(req.body, ['title', 'image', '_author', 'body', 'tags']);
        body.date = new Date();
        let product = new Product(body);
        console.log("In Product API END POINT")
        console.log(body);
        product.save().then((product) => {
            Product.populate(product, { path: "_author" }, function (err, product) {
                res.status(200).send({
                    success: true,
                    message: "Created Product",
                    product: product
                })

            })
        }).catch((e) => {
            res.status(400).send({
                success: false,
                message: "Product not created",
                error: e
            })
        })
    });

    ProductApi.get("/products", function (req, res) {
        console.log("Get Product Called?")
        // console.log(req.body);

        Product.find().sort('-date').populate("_author").exec(function (err, products) {
            if (err) console.log(err);
            //console.log(product);
            res.status(200).send({
                success: true,
                message: "Products retrieved",
                products: products
            })
        })
    })

    ProductApi.get("/products/:limit", function (req, res) {
        console.log("Get Product Called?")
        console.log("Limit: ", req.params.limit);
        // console.log(req.body);

        Product.find().sort('-date').limit(parseInt(req.params.limit)).populate("_author").exec(function (err, products) {
            if (err) console.log(err);

            res.status(200).send({
                success: true,
                message: "Products retrieved",
                latest_products: products
            })
        })
    })


    ProductApi.get("/:id", function (req, res) {
        Product.findById(req.params.id)
            .populate("_author")
            .exec(function (err, product) {
                if (err) {
                    console.log("Error Occured", err)
                    res.status(400).send({
                        success: false,
                        message: "Did NotRetrieved Single Product",
                        error: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Retrieved Single Product",
                        product: product
                    })
                }
            })
    })

    return ProductApi;

}