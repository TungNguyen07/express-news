module.exports.checkEditor = function(req, res, next) {
  //console.log(req.body.summary);
  let errors = [];
  if (!req.body.title) errors.push("Title is required!");
  if (!req.body.summary) errors.push("Summary is required!");
  if (!req.body.editor) errors.push("Content is required!");
  if (errors.length) {
    res.render("post/newPost", {
      errors: errors,
      title: req.body.title,
      editor: req.body.editor,
      summary: req.body.summary
    });
    return;
  }

  next();
};
