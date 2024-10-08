import React, { useState } from "react";
import axios from "axios";
const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    // await axios.post(`http://localhost:4001/posts/${postId}/comments`,{content})
    await axios.post(`http://post.com/posts/${postId}/comments`, { content });
    setContent("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>new comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
export default CommentCreate;
