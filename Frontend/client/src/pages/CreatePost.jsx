import { useState } from "react";
import API from "../api.jsx";
import "../styles/Form.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/posts",
        { title, subtitle, category, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = "/";
    } catch (err) {
      setError("Failed to create post");
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Create Post</h2>

        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Subtitle</label>
          <input value={subtitle} onChange={e => setSubtitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input value={category} onChange={e => setCategory(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea rows="5" value={content} onChange={e => setContent(e.target.value)} required />
        </div>

        <button className="form-btn">Publish</button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
}
