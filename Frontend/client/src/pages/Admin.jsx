import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.jsx";
import "./Home.css";

const permanentPosts = [
   {
    _id: "1",
    title: "The Rise of Cyber AI",
    subtitle: "How neon networks are reshaping intelligence",
    category: "AI",
    readTime: 5,
    author: "JTech Core",
    date: "Jan 2026",
    excerpt: "From neural clouds to sentient code, cyber AI is redefining intelligence...",
    content: `Cyber AI is no longer science fiction. From neural cloud networks to sentient code systems, machines are learning and evolving like never before. Organizations are deploying AI-powered assistants that not only predict outcomes but also create new algorithms autonomously. With advancements in cybernetics and neural interfaces, the line between human and machine intelligence is blurring. Ethical implications are vast, but the potential for innovation is unprecedented. This is the dawn of a new era where AI doesn't just assist—it innovates.`,
    likes: 120,
    comments: ["Mind-blowing article!", "Love the insights."]
  },
  {
    _id: "2",
    title: "Quantum Web Explained",
    subtitle: "The next evolution of the internet",
    category: "Web3",
    readTime: 7,
    author: "Nova Dev",
    date: "Jan 2026",
    excerpt: "Quantum routing will make today's latency obsolete...",
    content: `The Quantum Web leverages quantum computing principles to revolutionize the internet. Unlike traditional networks, it can process multiple states simultaneously, reducing latency to near zero. Quantum encryption ensures unparalleled security, making hacking almost impossible. As we integrate quantum protocols into Web3 applications, decentralized systems will be faster, safer, and more resilient. The future of browsing, streaming, and online interaction is about to get a quantum upgrade.`,
    likes: 98,
    comments: []
  },
  {
    _id: "3",
    title: "Neon Metaverse Trends",
    subtitle: "Virtual worlds in 2026",
    category: "Metaverse",
    readTime: 6,
    author: "Meta Labs",
    date: "Jan 2026",
    excerpt: "The digital frontier is expanding beyond imagination...",
    content: `The Metaverse is entering a neon-infused era where virtual reality, augmented reality, and AI converge. 2026 trends show immersive social hubs, VR fitness programs, and fully interactive digital marketplaces. Brands and individuals alike are creating virtual assets with real-world value. Avatars are becoming extensions of identity, and blockchain integration ensures ownership and authenticity. The neon metaverse is a playground for creativity, commerce, and connection.`,
    likes: 75,
    comments: ["Amazing insights!"]
  },
  {
    _id: "4",
    title: "AI-Powered Creativity",
    subtitle: "Bots that write poetry and code",
    category: "AI",
    readTime: 4,
    author: "JTech Core",
    date: "Jan 2026",
    excerpt: "Artificial creativity is now a reality...",
    content: `AI is now capable of creating content that rivals human creativity. From writing poems to generating code, AI bots assist and sometimes outperform traditional creators. They can remix ideas, generate music, and produce designs based on input parameters. The rise of AI-powered creativity challenges our definition of art and pushes boundaries in technology, entertainment, and education.`,
    likes: 50,
    comments: []
  },
  {
    _id: "5",
    title: "Web3 Social Dynamics",
    subtitle: "Decentralized communities",
    category: "Web3",
    readTime: 5,
    author: "Nova Dev",
    date: "Jan 2026",
    excerpt: "Social networks without central servers...",
    content: `Web3 is decentralizing social networks, giving users control over data, identity, and content monetization. Communities form around shared values and governance, rather than corporate platforms. Blockchain ensures transparency, while token-based incentives encourage participation. As these networks grow, traditional social dynamics are evolving, promoting autonomy, privacy, and creativity in digital interactions.`,
    likes: 88,
    comments: ["Interesting concept!"]
  },
  {
    _id: "6",
    title: "Cybersecurity in 2026",
    subtitle: "AI hackers and defenses",
    category: "Security",
    readTime: 8,
    author: "SafeTech",
    date: "Jan 2026",
    excerpt: "The new wave of cybersecurity challenges...",
    content: `Cybersecurity is entering a high-stakes era where AI-driven attacks are countered by AI-based defense systems. Automated intrusion detection, predictive threat modeling, and intelligent firewalls are becoming standard. Organizations must balance convenience with security as attackers exploit AI to breach systems faster than ever. Awareness, training, and cutting-edge defenses are critical to survive this new digital battlefield.`,
    likes: 110,
    comments: ["Scary but necessary."]
  },
  {
    _id: "7",
    title: "Quantum AI Integration",
    subtitle: "Fusing two cutting-edge fields",
    category: "AI",
    readTime: 7,
    author: "Nova Dev",
    date: "Jan 2026",
    excerpt: "Quantum computing meets artificial intelligence...",
    content: `Integrating quantum computing with AI promises exponential growth in processing and learning capabilities. Quantum AI algorithms can solve complex problems like optimization, cryptography, and molecular modeling far faster than classical computers. Industries such as finance, healthcare, and energy are beginning to harness this fusion, leading to breakthroughs that were previously impossible.`,
    likes: 95,
    comments: []
  },
  {
    _id: "8",
    title: "Virtual Reality Fitness",
    subtitle: "Gamifying workouts",
    category: "VR",
    readTime: 5,
    author: "Meta Labs",
    date: "Jan 2026",
    excerpt: "Stay fit while exploring new worlds...",
    content: `Virtual reality is transforming fitness by gamifying workouts. Users explore digital worlds, complete challenges, and track their performance while exercising. VR fitness increases motivation, engagement, and adherence to exercise routines. With multiplayer modes, users can compete and collaborate, making workouts both fun and social.`,
    likes: 60,
    comments: ["Love this idea!"]
  }
];

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    subtitle: "",
    category: "",
    readTime: "",
    author: "",
    date: "",
    excerpt: "",
    content: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/posts")
      .then(res => setPosts(res?.data || permanentPosts))
      .catch(() => {
        setError("Backend unavailable. Showing local posts.");
        setPosts(permanentPosts);
      });
  }, []);

  const handleAdd = () => {
    if (!newPost.title.trim()) return;
    const post = { ...newPost, _id: Date.now().toString(), likes: 0, comments: [] };
    setPosts([post, ...posts]);
    setNewPost({ title: "", subtitle: "", category: "", readTime: "", author: "", date: "", excerpt: "", content: "" });
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setPosts(posts.filter(p => p._id !== id));
  };

  const openPost = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: "#ff9bff" }}>{error}</p>}

      <div style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        <h2>Add New Post</h2>
        <input placeholder="Title" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} />
        <input placeholder="Subtitle" value={newPost.subtitle} onChange={e => setNewPost({ ...newPost, subtitle: e.target.value })} />
        <input placeholder="Category" value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })} />
        <input type="number" placeholder="Read Time (min)" value={newPost.readTime} onChange={e => setNewPost({ ...newPost, readTime: e.target.value })} />
        <input placeholder="Author" value={newPost.author} onChange={e => setNewPost({ ...newPost, author: e.target.value })} />
        <input placeholder="Date" value={newPost.date} onChange={e => setNewPost({ ...newPost, date: e.target.value })} />
        <textarea placeholder="Excerpt" value={newPost.excerpt} onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })}></textarea>
        <textarea placeholder="Content" value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })}></textarea>
        <button onClick={handleAdd} style={{ marginTop: "10px" }}>Add Post</button>
      </div>

      <h2>All Posts</h2>
      {posts.map(p => (
        <div
          key={p._id}
          className="card post"
          style={{ marginBottom: "20px", padding: "10px", position: "relative", cursor: "pointer" }}
          onClick={() => openPost(p._id)}
        >
          <h3>{p.title}</h3>
          <p>{p.excerpt}</p>
          <button 
            onClick={(e) => handleDelete(p._id, e)} 
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
