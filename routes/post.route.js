const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");
const validatePermiss = require("../middleware/validatePermission");
const validateAuthor = require("../middleware/validateAuthor");
const validateContent = require("../middleware/validateEditor");
const cmtController = require("../controller/comment.controller");

router.get("/write-news", validateAuthor.checkAuthor, postController.write);

router.get(
  "/manage-post",
  validatePermiss.checkPermission,
  postController.listPost
);

router.post(
  "/write-news",
  validateAuthor.checkAuthor,
  validateContent.checkEditor,
  postController.post
);

router.get(
  "/approve/:id",
  validatePermiss.checkPermission,
  postController.approvePost
);

router.get(
  "/deny/:id",
  validatePermiss.checkPermission,
  postController.denyPost
);

router.get("/view/:title/:id", postController.view);

router.get("/review/:id", postController.review);

router.post("/view/:name/:id/comment", cmtController.postComment);

router.post("/view/:name/:id/reply", cmtController.postReply);

router.get("/view/:name/:id/comment", cmtController.getComment);

//router.get("/view/:name/:id/reply", cmtController.getReply);

module.exports = router;
