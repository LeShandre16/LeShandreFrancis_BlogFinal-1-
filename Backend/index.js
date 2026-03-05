import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Demo posts with full content
let posts = [
  {
    _id: "1",
    title: "Introduction to Tech",
    subtitle: "Getting started with modern technology",
    category: "Tech",
    readTime: 5,
    content: `
Technology is evolving faster than ever. From AI to IoT, understanding the basics
of modern technology can help you stay ahead in both career and personal projects.
In this post, we'll cover the fundamentals you need to know to start exploring tech.
`
  },
  {
    _id: "2",
    title: "Blogging Basics",
    subtitle: "How to start and maintain a blog",
    category: "Blog",
    readTime: 7,
    content: `
Blogging is a powerful way to share knowledge and build your personal brand.
Learn how to choose a niche, write engaging content, and promote your blog
to reach the right audience. We'll also cover tools and platforms to get started.
`
  },
  {
    _id: "3",
    title: "Advanced Topics in Tech",
    subtitle: "Deep dive into AI, Blockchain, and Cloud Computing",
    category: "Tech",
    readTime: 10,
    content: `
For tech enthusiasts looking to level up, exploring advanced topics is essential.
This post covers Artificial Intelligence, Blockchain technologies, and Cloud
Computing services, explaining how they work and real-world applications.
`
  },
  {
    _id: "4",
    title: "Effective Remote Work",
    subtitle: "Tips and tools for productivity from home",
    category: "Productivity",
    readTime: 6,
    content: `
Remote work is becoming the new normal. To stay productive, you need
the right mindset, workspace, and tools. This post provides practical
advice on managing time, collaborating with teams, and avoiding burnout.
`
  },
  {
    _id: "5",
    title: "Cybersecurity Essentials",
    subtitle: "Protect yourself online",
    category: "Security",
    readTime: 8,
    content: `
With more of our lives online, cybersecurity is crucial. Learn how
to protect your accounts, secure your devices, and avoid common
scams and attacks. We'll cover passwords, two-factor authentication,
and safe browsing practices.
`
  }
];

// GET /api/posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// GET /api/posts/:id
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find(p => p._id === req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
