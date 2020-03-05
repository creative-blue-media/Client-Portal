
var path = require('path');

module.exports = function(app) {

    app.get('*', function(req, res) {
        console.log("here")
        res.sendFile('./api.html'); // load our public/index.html file
    });

};