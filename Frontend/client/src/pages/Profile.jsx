import React, { useEffect, useState } from "react";
import API from "../api.jsx";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = "currentUserId";

  useEffect(() => {
    API.get(`/user/${userId}`)
      .then(res => setUser(res.data))
      .catch(() => {
        setError("Failed to fetch user info.");
        setUser({
          username: "JohnDoe",
          email: "johndoe@example.com",
          bio: "A passionate tech writer and developer.",
          joined: "Jan 2025",
        });
      });

    API.get("/posts")
      .then(res => {
        const posts = (res.data || []).filter(p => p.authorId === userId || p.author === "JohnDoe");
        setUserPosts(posts);
      })
      .catch(() => {
        setError("Failed to fetch posts.");
        setUserPosts([]);
      });
  }, [userId]);

  const handleSave = () => {
    if (!user.username.trim() || !user.email.trim()) return;

    API.put(`/user/${userId}`, user)
      .then(res => {
        setUser(res.data);
        setEditMode(false);
      })
      .catch(() => {
        setError("Failed to update user info.");
      });
  };

  const handleDeletePost = (id, e) => {
    e.stopPropagation(); 

    API.delete(`/posts/${id}`)
      .then(() => {
        setUserPosts(userPosts.filter(p => p._id !== id));
      })
      .catch(() => setError("Failed to delete post."));
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Profile</h1>
      {error && <p style={{ color: "#ff9bff" }}>{error}</p>}

     
      <div className="card" style={{ padding: "20px", marginBottom: "30px" }}>
        {editMode ? (
          <>
            <input
              value={user.username}
              onChange={e => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <input
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <textarea
              value={user.bio}
              onChange={e => setUser({ ...user, bio: e.target.value })}
              placeholder="Bio"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={handleSave} style={{ marginRight: "10px" }}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h2>{user.username}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <p><strong>Joined:</strong> {user.joined}</p>
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </>
        )}
      </div>

      <h2>My Posts</h2>
      {userPosts.length === 0 && <p>No posts yet.</p>}
      {userPosts.map(p => (
        <div
          key={p._id}
          className="card post"
          style={{ marginBottom: "20px", padding: "10px", position: "relative", cursor: "pointer" }}
          onClick={() => navigate(`/post/${p._id}`)}
        >
          <h3>{p.title}</h3>
          <p>{p.excerpt}</p>
          <button
            onClick={(e) => handleDeletePost(p._id, e)}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
