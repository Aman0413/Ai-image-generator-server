const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    pulicId: String,
    url: String,
  },
});
module.exports = mongoose.model("post", postSchema);
