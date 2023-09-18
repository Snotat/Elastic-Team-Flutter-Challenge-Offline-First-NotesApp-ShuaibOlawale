const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let messageSchema = new Schema({
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  time: {
    type: String,
  },
});
module.exports = mongoose.model("Message", messageSchema);
