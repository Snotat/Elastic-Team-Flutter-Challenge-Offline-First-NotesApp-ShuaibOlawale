var express = require("express");
var router = express.Router();
var message = require("../models/notes");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const data = message
    .find()
    .then((rest) => {
      res.send(rest);
    })

    .catch((err) => {
      res.status(500).send(err.data);
    });
});

module.exports = router;
