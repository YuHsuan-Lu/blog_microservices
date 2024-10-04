const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json());

const storedEvent = [];
app.post("/events", (req, res) => {
  const event = req.body;
  storedEvent.push(event);

  // axios.post('http://localhost:4000/events',event).catch(err=>{
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  // axios.post('http://localhost:4001/events',event).catch(err=>{
  //     console.log(err.message)
  // })
  // axios.post('http://localhost:4002/events',event).catch(err=>{
  //     console.log(err.message)
  // })
  // axios.post('http://localhost:4003/events',event).catch(err=>{
  //     console.log(err.message)
  // })
  res.send({ status: "ok" });
});
app.get("/events", (req, res) => {
  res.send(storedEvent);
});
app.listen(4005, () => {
  console.log("listening on 4005");
});
