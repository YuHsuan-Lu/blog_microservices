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
const posts = {};
//routers
// app.get("/posts", (req, res) => {
//   res.send(posts);
// });
app.post("/posts/create", async (req, res) => {
  // get a random string
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  // emit an event
  // await axios.post("http://localhost:4005/events", {
  await axios.post("http://event-bus-clusterip-srv:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });
  //201: created a resource
  res.status(201).send(posts[id]);
});
app.post("/events", (req, res) => {
  console.log("Post Service Received Event: ", req.body.type);
  res.send({ success: true });
});
app.listen(4000, () => {
  console.log("v3");
  console.log("listening on 4000");
});
