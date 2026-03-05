import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.jsx";
import homeBg from "../assets/SoftPurple_background.jpg";
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

export default function Home() {
  const [posts, setPosts] = useState(permanentPosts);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    API.get("/posts")
      .then(res => {
        const backendPosts = res?.data || [];
        const mergedPosts = [...backendPosts, ...permanentPosts]
          .slice(0, 8)
          .map(p => ({ ...p, likes: p.likes ?? 0, comments: p.comments ?? [] }));
        setPosts(mergedPosts);
      })
      .catch(() => {
        setError("Backend unavailable. Showing local feed.");
        setPosts(permanentPosts);
      });
  }, []);

  const handleLike = (e, postId) => {
    e.stopPropagation();
    setPosts(posts.map(p => (p._id === postId ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleComment = (e, postId) => {
    e.stopPropagation();
    const text = commentText[postId];
    if (!text?.trim()) return;
    setPosts(posts.map(p => (p._id === postId ? { ...p, comments: [...p.comments, text] } : p)));
    setCommentText({ ...commentText, [postId]: "" });
  };

  return (
    <div
      className="home-background"
      style={{ backgroundImage: `url(${homeBg})`, minHeight: "100vh", paddingTop: "80px" }}
    >
      <div className="container">
        {error && <p style={{ color: "#ff9bff", marginBottom: "1rem" }}>{error}</p>}

        {posts.map(p => (
          <div key={p._id} className="card post" style={{ cursor: "pointer" }} onClick={() => nav(`/post/${p._id}`)}>
            <div className="post-content">
              <h2>{p.title}</h2>
              <p className="subtitle">{p.subtitle}</p>
              <p className="excerpt">{p.excerpt}</p>
              <div className="meta-row">
                <span>{p.category}</span>
                <span>{p.readTime} min read</span>
                <span>By {p.author}</span>
                <span>{p.date}</span>
              </div>

              <div className="engagement">
                <button onClick={(e) => handleLike(e, p._id)}>❤️ {p.likes}</button>
                <span style={{ marginLeft: "10px" }}>💬 {p.comments.length}</span>
              </div>

              <div className="comment-section" onClick={e => e.stopPropagation()}>
                {p.comments.map((c, i) => <div key={i} className="comment">{c}</div>)}
                <div className="comment-form">
                  <input
                    value={commentText[p._id] || ""}
                    onChange={e => setCommentText({ ...commentText, [p._id]: e.target.value })}
                    placeholder="Add a comment..."
                  />
                  <button onClick={(e) => handleComment(e, p._id)}>Post</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
