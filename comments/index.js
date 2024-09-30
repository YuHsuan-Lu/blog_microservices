const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require('cors')
const axios = require('axios')
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
app.post("/posts/:postId/comments", async(req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const content = req.body.content
  const comments = commentsByPostId[req.params.postId] || []
  comments.push({id:commentId, content})
  commentsByPostId[req.params.postId] = comments
  // emit an event
  await axios.post('http://localhost:4005/events',{
    type:'CommentCreated',
    data:{id:commentId, content, postId:req.params.postId},
  })
  res.status(201).send(comments)
});
app.post("/events",(req,res)=>{
    console.log('Comment Service Received Event: ',req.body.type)
    res.send({success:true})
})
app.listen(4001, () => {
  console.log("listening on 4001");
});
