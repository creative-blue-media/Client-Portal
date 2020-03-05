let {User} = require("../models/user/user");

var authenticate = (req, res, next) => {
  let token = req.header("x-auth");

  User.findByToken(token).then((user) => {
    if(!user){
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send({
      success: false,
      message: "Error in Token Authentication",
      error: e
    });
  })

}

module.exports = {authenticate: authenticate}
