import cmtModel from "../model/comment.model";

//Add comment
module.exports.postComment = function(req, res) {
  let user = res.locals.user;
  let idPost = req.params.id;

  let comment = {
    idPost: idPost,
    idUser: user._id,
    owner: user.name,
    comment: req.body.comment
  };

  //console.log("comment", req.body.comment);
  cmtModel.create(comment, function(err, res) {
    if (err) throw err;
    console.log("Add comment sucessfully");
  });
};

// Add reply
module.exports.postReply = function(req, res) {
  let user = res.locals.user;
  let id = req.params.id;
  let commentID = req.body.commentID;
  let repComment = req.body.post_rep;
  console.log(repComment);
  let reply = {
    idUser: user._id,
    owner: user.name,
    repComment: repComment
  };
  let query = { $push: { reply: reply } };
  cmtModel.updateOne({ _id: commentID }, query, function(err, res) {
    if (err) throw err;
    console.log("Reply sucessfully");
  });
};

export const getCommentFollowIdPost = function getCommentFollowIdPost(idPost) {
  const cmt = cmtModel.find({ idPost: idPost });
  return cmt;
};

//get Comment
module.exports.getComment = function(req, res) {
  let idPost = req.params.id;
  cmtModel.find({ idPost: idPost }, function(err, response) {
    res.json(response);
  });
};
