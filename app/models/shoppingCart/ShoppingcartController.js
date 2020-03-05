let Shoppingcart = require("./Shoppingcart.js").Shoppingcart;
let { authenticate } = require("../../middleware/authenticate");
let _ = require("lodash");



module.exports = function (app, express) {

    let ShoppingcartApi = express.Router();
    // Create new shoppingcart
    ShoppingcartApi.post("/", authenticate, (req, res) => {
        let body = _.pick(req.body, ['_customer', 'items']);
        body.updated_at = new Date();
        let shoppingcart = new Shoppingcart(body);
        console.log("In Shoppingcart API END POINT")
        console.log(body);
        shoppingcart.save().then((shoppingcart) => {
            Shoppingcart.populate(shoppingcart, { path: "_customer" }, function (err, shoppingcart) {
                res.status(200).send({
                    success: true,
                    message: "Created Shoppingcart",
                    shoppingcart: shoppingcart
                })

            })
        }).catch((e) => {
            res.status(400).send({
                success: false,
                message: "Shoppingcart not created",
                error: e
            })
        })
    });

    ShoppingcartApi.get("/shoppingcart/:customer_id", function (req, res) {
        console.log("Get Shoppingcart By Cust ID")
        // console.log(req.body);
        let cust_id = req.params.customer_id;

        Shoppingcart.findOne({ "_customer": cust_id })
            .sort('-date')
            .populate("_customer")
            .populate("items")
            .exec(function (err, shoppingcart) {

                if (err) {
                    console.log(err);
                }
                //console.log(shoppingcart);
                if (shoppingcart) {
                    res.status(200).send({
                        success: true,
                        message: "Shoppingcarts retrieved",
                        shoppingcart: shoppingcart
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        message: "Item Not Found"
                    })
                }

            })
    })

    ShoppingcartApi.get("/inventories/:limit", function (req, res) {
        console.log("Get Shoppingcart Called?")
        console.log("Limit: ", req.params.limit);
        // console.log(req.body);

        Shoppingcart.find().sort('-date').limit(parseInt(req.params.limit)).populate("_create").exec(function (err, inventories) {
            if (err) console.log(err);

            res.status(200).send({
                success: true,
                message: "Inventories retrieved",
                latest_inventories: inventories
            })
        })
    })


    ShoppingcartApi.put("/shopcart/update/:id", function (req, res) {
        console.log("In ShopCart Update", req.params.id, req.body)
        Shoppingcart.findById(req.params.id, function (err, shoppingcart) {
            if (err) console.log("Err retrieving shopping cart", err);
            console.log("shopping cart found: ", shoppingcart)
            shoppingcart.items = req.body.items;
            shoppingcart.save().then((shoppingcart) => {
                Shoppingcart.populate(shoppingcart, { path: "_customer" }, function (err, shoppingcart) {
                    res.status(200).send({
                        success: true,
                        message: "Updated Shoppingcart",
                        shoppingcart: shoppingcart
                    })

                })
            }, (err) => {
                console.log("err", err);
            })
        })

    })

    ShoppingcartApi.get("/:id", function (req, res) {
        Shoppingcart.findById(req.params.id)
            .populate("_author")
            .exec(function (err, shoppingcart) {
                if (err) {
                    console.log("Error Occured", err)
                    res.status(400).send({
                        success: false,
                        message: "Did NotRetrieved Single Shoppingcart",
                        error: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Retrieved Single Shoppingcart",
                        shoppingcart: shoppingcart
                    })
                }
            })
    })

    return ShoppingcartApi;

}