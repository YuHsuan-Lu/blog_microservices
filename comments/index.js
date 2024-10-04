const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
//register middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

const commentsByPostId = {};
//routers
app.get("/posts/:postId/comments", (req, res) => {
  const comments = commentsByPostId[req.params.postId] || [];
  res.send(comments);
});
app.post("/posts/:postId/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const content = req.body.content;
  const comments = commentsByPostId[req.params.postId] || [];
  comments.push({
    id: commentId,
    content,
    status: "pending",
  });
  commentsByPostId[req.params.postId] = comments;
  // emit an event
  // await axios.post('http://localhost:4005/events',{
  await axios.post("http://event-bus-clusterip-srv:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.postId,
      status: "pending",
    },
  });
  res.status(201).send(comments);
});
app.post("/events", async (req, res) => {
  console.log("Comment Service Received Event: ", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { id, content, postId, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    // await axios.post('http://localhost:4005/events',{
    await axios.post("http://event-bus-clusterip-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }
  res.send({ success: true });
});
app.listen(4001, () => {
  console.log("listening on 4001");
});
