import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api.jsx";
import homeBg from "../assets/SoftPurple_background.jpg";
import "./Home.css";

const permanentPosts = [
  // Same 8 posts a Home.jsx
];

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    API.get("/posts")
      .then(res => {
        const backendPosts = res?.data || [];
        const found = backendPosts.find(p => p._id === id) || permanentPosts.find(p => p._id === id);
        if (found) setPost({ ...found, likes: found.likes ?? 0, comments: found.comments ?? [] });
        else setError("Post not found.");
      })
      .catch(() => {
        const found = permanentPosts.find(p => p._id === id);
        if (found) setPost(found);
        else setError("Post not found.");
      });
  }, [id]);

  if (error) return <div style={{ padding: "20px", color: "#ff9bff" }}>{error}</div>;
  if (!post) return <div style={{ padding: "20px" }}>Loading...</div>;

  const handleLike = () => setPost(prev => ({ ...prev, likes: prev.likes + 1 }));
  const handleComment = () => {
    if (!commentText.trim()) return;
    setPost(prev => ({ ...prev, comments: [...prev.comments, commentText] }));
    setCommentText("");
  };

  return (
    <div className="home-background" style={{ backgroundImage: `url(${homeBg})`, minHeight: "100vh", paddingTop: "80px" }}>
      <div className="container" style={{ background: "rgba(255,255,255,0.95)", padding: "20px", borderRadius: "8px" }}>
        <button onClick={() => nav(-1)} style={{ marginBottom: "20px" }}>← Back</button>
        <h1>{post.title}</h1>
        <p className="subtitle">{post.subtitle}</p>
        <div className="meta-row">
          <span>{post.category}</span>
          <span>{post.readTime} min read</span>
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>
        <p style={{ marginTop: "20px", lineHeight: "1.6" }}>{post.content}</p>

        <div className="engagement" style={{ marginTop: "20px" }}>
          <button onClick={handleLike}>❤️ {post.likes}</button>
          <span style={{ marginLeft: "10px" }}>💬 {post.comments.length}</span>
        </div>

        <div className="comment-section" style={{ marginTop: "20px" }}>
          {post.comments.map((c, i) => <div key={i} className="comment">{c}</div>)}
          <div className="comment-form" style={{ marginTop: "10px" }}>
            <input
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleComment}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
