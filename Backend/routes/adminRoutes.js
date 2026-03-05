import express from "express";
import BlogPost from "../models/BlogPost.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/analytics", protect, adminOnly, async (req, res) => {
  try {
    const posts = await BlogPost.find();

    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
    const totalLikes = posts.reduce((sum, p) => sum + p.likes.length, 0);

    const topPosts = posts
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map(p => ({
        _id: p._id,
        title: p.title,
        views: p.views,
        likes: p.likes.length,
        category: p.category,
        createdAt: p.createdAt
      }));

    res.json({
      totalPosts,
      totalViews,
      totalLikes,
      topPosts
    });
  } catch (err) {
    console.error("Admin analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/posts", protect, adminOnly, async (req, res) => {
  try {
    const posts = await BlogPost.find().populate("author", "username email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

router.put("/posts/:id/feature", protect, adminOnly, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    post.featured = !post.featured;
    await post.save();
    res.json({ message: "Post feature status updated", post });
  } catch (err) {
    res.status(500).json({ message: "Feature toggle failed" });
  }
});

router.delete("/posts/:id", protect, adminOnly, async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: "Admin delete failed" });
  }
});

export default router;
