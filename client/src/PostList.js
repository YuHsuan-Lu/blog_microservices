import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
const PostList = () => {
  // old version
  // posts = {
  // "3559e7df": {
  //     "id": "3559e7df",
  //     "title": "123"
  // }
  // }
  // new version
  // posts = {
  //     "096232ac": {
  //         "id": "096232ac",
  //         "title": "111",
  //         "comments": [
  //             {
  //                 "id": "4641c8a6",
  //                 "content": "111"
  //             },
  //             {
  //                 "id": "b6d91d40",
  //                 "content": "222"
  //             }
  //         ]
  //     }
  // }
  const [posts, setPosts] = useState([]);
  const fetchPost = async () => {
    // old version: use Post Service
    // const res = await axios.get('http://localhost:4000/posts')
    // setPosts(res.data)
    // new version: use Query Service
    // const res = await axios.get('http://localhost:4002/posts')
    // const res = await axios.get("http://post.com/posts");
    const res = await axios.get("http://post.com/posts/query");
    setPosts(res.data);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={[post.id]}
      >
        <div className="card-body">
          <h2>{post.title}</h2>
          {/* <CommentList postId={post.id}/> */}
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
export default PostList;
