var express = require("express");
var router = express.Router();
var message = require("../models/notes");

/* GET users listing. */
router.post("/get", async function (req, res, next) {
  const data = await message
    .findById(req.body.id)
    .then((rest) => {
      console.log(rest);
      res.send(rest);
    })

    .catch((err) => {
      res.status(500).send(err.data);
    });
});
router.post("/update", async function (req, res, next) {
  const { id, text, subject } = req.body;
  console.log("update", id, text, subject);
  try {
    await message
      .findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            message: text,
            subject: subject,
          },
        }
      )
      .then((rest) => {
        return res.json(rest);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});
router.post("/delete", async function (req, res, next) {
  const { id } = req.body;
  console.log("update", id);
  try {
    await message
      .findByIdAndDelete({ _id: id })
      .then((rest) => {
        return res.json(rest);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
