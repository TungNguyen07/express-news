const mongoose = require("mongoose");

let postSchema = mongoose.Schema(
  {
    category: String,
    summary: String,
    content: String,
    title: String,
    author: String,
    created: Date,
    view: { type: Number, default: 0 },
    status: { type: Boolean, default: false }
  },
  { versionKey: false }
);

let posts = mongoose.model("post", postSchema);

module.exports = posts;
