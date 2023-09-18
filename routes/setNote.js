var express = require("express");
var router = express.Router();
var message = require("../models/notes");

/* GET users listing. */
router.post("/", function (req, res, next) {
  console.log(req.body);
  const data = new message({
    subject: req.body.subject,
    message: req.body.text,
    time: req.body.time,
  });

  data.save().then((rest) => {
    res.json({ data: rest });
  });
});

module.exports = router;
