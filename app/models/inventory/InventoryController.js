let Inventory = require("./Inventory.js").Inventory;
let { authenticate } = require("../../middleware/authenticate");
let _ = require("lodash");



module.exports = function (app, express) {

    let InventoryApi = express.Router();
    // Create new inventory
    InventoryApi.post("/", authenticate, (req, res) => {
        let body = _.pick(req.body, ['name', 'image', 'date', 'cost', '_creator', 'description', 'quantity_sold']);
        body.date = new Date();
        let inventory = new Inventory(body);
        console.log("In Inventory API END POINT")
        console.log(body);
        inventory.save().then((inventory) => {
            Inventory.populate(inventory, { path: "_author" }, function (err, inventory) {
                res.status(200).send({
                    success: true,
                    message: "Created Inventory",
                    inventory: inventory
                })

            })
        }).catch((e) => {
            res.status(400).send({
                success: false,
                message: "Inventory not created",
                error: e
            })
        })
    });

    InventoryApi.get("/inventorys", function (req, res) {
        console.log("Get Inventory Called?")
        // console.log(req.body);

        Inventory.find().sort('-date').populate("_author").exec(function (err, inventorys) {
            if (err) console.log(err);
            //console.log(inventory);
            res.status(200).send({
                success: true,
                message: "Inventorys retrieved",
                inventorys: inventorys
            })
        })
    })

    InventoryApi.get("/inventories/:limit", function (req, res) {
        console.log("Get Inventory Called?")
        console.log("Limit: ", req.params.limit);
        // console.log(req.body);

        Inventory.find().sort('-date').limit(parseInt(req.params.limit)).populate("_create").exec(function (err, inventories) {
            if (err) console.log(err);

            res.status(200).send({
                success: true,
                message: "Inventories retrieved",
                latest_inventories: inventories
            })
        })
    })


    InventoryApi.get("/:id", function (req, res) {
        Inventory.findById(req.params.id)
            .populate("_author")
            .exec(function (err, inventory) {
                if (err) {
                    console.log("Error Occured", err)
                    res.status(400).send({
                        success: false,
                        message: "Did NotRetrieved Single Inventory",
                        error: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Retrieved Single Inventory",
                        inventory: inventory
                    })
                }
            })
    })

    return InventoryApi;

}