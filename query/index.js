const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

const posts = {}
app.get('/posts',(req,res)=>{
    res.send(posts)
})
app.post('/events',(req,res)=>{
    const {type,data} = req.body
    if (type==='PostCreated'){
        const {id,title} = data
        posts[id] = {id,title,comments:[]}
    }
    if (type==='CommentCreated'){
        const {id,content,postId} = data
        const post = posts[postId]
        post.comments.push({id,content})
    }
    res.send({success:true})
})

app.listen(4002,()=>{
    console.log('listening on 4002')
})