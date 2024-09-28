const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const posts = {};
app.use(bodyParser.json());
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts", (req, res) => {
  // get a random string
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  //201: created a resource
  res.status(201).send(posts[id]);
});
app.listen(4000, () => {
  console.log("listening on 4000");
});
