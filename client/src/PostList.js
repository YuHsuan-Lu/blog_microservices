import React,{useState,useEffect} from "react";
import axios from 'axios'
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
const PostList = ()=>{
    // posts = {
                // "3559e7df": {
                //     "id": "3559e7df",
                //     "title": "123"
                // },
                // "fb472456": {
                //     "id": "fb472456",
                //     "title": "second post"
                // }
            // }
    const [posts,setPosts] = useState([])
    const fetchPost = async()=>{
        // old version: use Post Service
        // const res = await axios.get('http://localhost:4000/posts')
        // setPosts(res.data)
        // new version: use Query Service
        const res = await axios.get('http://localhost:4002/posts')
        setPosts(res.data)
    }
    useEffect(()=>{fetchPost()},[])
    const renderedPosts = Object.values(posts).map(post=>{
        return(
            <div className="card" style={{width:'30%',marginBottom:'20px'}} key={[post.id]}>
                <div className="card-body">
                    <h2>{post.title}</h2>
                    {/* <CommentList postId={post.id}/> */}
                    <CommentList comments={post.comments}/>
                    <CommentCreate postId={post.id}/>
                </div>         
            </div>
        )
    })
    return(
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    )
}
export default PostList