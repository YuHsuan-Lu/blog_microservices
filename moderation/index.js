const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv/config");
//register middleware
app.use(bodyParser.json());
//routers
const bannedWord = process.env.bannedWord;
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type == "CommentCreated") {
    console.log("bannedWord", bannedWord);
    const status = data.content.includes(bannedWord) ? "rejected" : "approved";
    // await axios.post('http://localhost:4005/events',{
    await axios.post("http://event-bus-clusterip-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status: status,
        content: data.content,
      },
    });
  }
  res.send({ success: true });
});
app.listen(4003, () => {
  console.log("listening on 4003");
});
