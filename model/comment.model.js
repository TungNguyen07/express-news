import mongoose from "mongoose";

let commentSchema = mongoose.Schema(
  {
    idPost: String,
    idUser: String,
    owner: String,
    comment: String,
    reply: [
      {
        idUser: String,
        owner: String,
        repComment: String
      }
    ]
  },
  { versionKey: false }
);

let comment = mongoose.model("comment", commentSchema);

module.exports = comment;
