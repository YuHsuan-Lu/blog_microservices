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
    // no longer need 
    // const [comments,setComments] = useState([])
    // const fetchComments = async()=>{
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data)
    // }
    // useEffect(()=>{fetchComments()}, [])
    const renderedComments = comments.map(comment=>{
        return <li key={comment.id}>{comment.content}</li>
    })
    // console.log(renderedComments)
    return(
        <div>
            <ul>{renderedComments}</ul>
        </div>
    )
}
export default CommentList