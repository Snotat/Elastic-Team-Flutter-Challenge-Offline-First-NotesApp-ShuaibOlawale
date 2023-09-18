var express = require("express");
var router = express.Router();
var message = require("../models/notes");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello");
  message
    .find()
    .then((res) => {
      console.log(res);
      res.send(message);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.data);
    });
});

module.exports = router;
