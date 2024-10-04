![Screenshot from 2024-09-30 15-07-15](https://github.com/user-attachments/assets/a499355d-b7a1-4465-bc44-8e6dcf3ef30d)
used tool: react, node/express, axios, docker, kubernetes, async communication
independent service
(the website will maintain most of usage even if other service crash)

comment moderation

即時性

all the events pass through event broker,
the event bus will broadcast them
the services will be triggered by certain events:

1. PostCreated
   time: when post get created
   sender: posts service
   reciver: query
   graph
2. CommentCreated:
   time:
   sender: comments service
   reciever:moderation/query
3. CommentModerated:
   time:
   sender: moderation
   reciever: comments
   id:string/content:string/postId:string/status:'approved'|'rejected'
4. CommentUpdated:
   time:after handling CommentModerated and update the comment accordingly
   sender:comments
   reciever:query
   id:string/content:string/postId:string/status:'approved'|'rejected'

dealing with missing event
