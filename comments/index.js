const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require('cors')
//register middleware
app.use(cors())
app.options('*',cors())
app.use(bodyParser.json());

const commentsByPostId = {};
//routers
app.get("/posts/:postId/comments", (req, res) => {
  const comments = commentsByPostId[req.params.postId] || []
  res.send(comments)
});
app.post("/posts/:postId/comments", (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const content = req.body.content
  const comments = commentsByPostId[req.params.postId] || []
  comments.push({id:commentId, content})
  commentsByPostId[req.params.postId] = comments
  res.status(201).send(comments)
});
app.listen(4001, () => {
  console.log("listening on 4001");
});
