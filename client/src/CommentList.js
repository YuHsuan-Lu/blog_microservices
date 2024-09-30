import React,{useState,useEffect} from "react";
import axios from 'axios'
const CommentList = ({comments})=>{
    // comment = [
    //     {
    //         "id": "e9aab7ab",
    //         "content": "123"
    //     },
    //     {
    //         "id": "818e4831",
    //         "content": "123"
    //     }
    // ]
    // no longer need after changing to call query API
    // const [comments,setComments] = useState([])
    // const fetchComments = async()=>{
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data)
    // }
    // useEffect(()=>{fetchComments()}, [])
    const renderedComments = comments.map(comment=>{
        let content
        if(comment.status==='approved'){
            content = comment.content
        }
        if(comment.status==='pending'){
            content = 'This comment is awaiting moderation'
        }
        if(comment.status==='rejected'){
            content = 'This comment has been rejected'
        }
        return <li key={comment.id}>{content}</li>
    })
    // console.log(renderedComments)
    return(
        <div>
            <ul>{renderedComments}</ul>
        </div>
    )
}
export default CommentList