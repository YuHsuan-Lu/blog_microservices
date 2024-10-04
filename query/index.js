const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
app.use(cors());
app.use(bodyParser.json());

const posts = {};
const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    console.log(id, content, postId, status);
    const comments = posts[postId].comments;
    console.log(comments);
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({ success: true });
});

app.listen(4002, async () => {
  console.log("listening on 4002");
  // const res = await axios.get('http://localhost:4005/events')
  const res = await axios.get("http://event-bus-clusterip-srv:4005/events");
  for (let event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvent(event.type, event.data);
  }
});
