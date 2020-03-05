// server.js

// modules
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("./config/mongoose.js").mongoose;
const _ = require("lodash");
const path = require("path");
// const morgan = require("morgan");
// const methodOverride = require('method-override');



// create express app instance
let app = express();
let server = http.createServer(app);


// variables to Api for backend routes
let user = require("./models/user/UserController")(app, express);
let project = require("./models/project/ProjectController")(app, express);
let blog = require("./models/blog/BlogController")(app, express);
let comment = require("./models/comment/CommentController")(app, express);
let notification = require("./models/notification/NotificationController")(app, express);
let inventory = require("./models/inventory/InventoryController")(app, express);
let shoppingCart = require("./models/shoppingCart/ShoppingcartController")(app, express);
// so that request/response calls can be made smoothly
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
// app.use(morgan("dev"));


// app.use(express.static(path.join(__dirname, '../public')));


/**
 *
 *  Set up routes for backend below
 *
 */

app.use('/api/users', user);
app.use('/api/projects', project);
app.use('/api/blogs', blog);
app.use('/api/comments', comment);
app.use('/api/notifications', notification);
app.use('/api/inventories', inventory)
app.use('/api/shoppingcarts', shoppingCart)

// require('./routes')(app);


var port = 4000;

server.listen(port, ()=>{
  console.log("listening on port ", port);
})
exports = module.exports = app;
