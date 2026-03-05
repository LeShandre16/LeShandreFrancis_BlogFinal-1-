import express from "express";
import multer from "multer";
import BlogPost from "../models/BlogPost.js";
import cloudinary from "../utils/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res) => {
  const posts = await BlogPost.find({ published: true }).populate("author", "username");
  res.json(posts);
});

router.get("/search", async (req, res) => {
  const { tag, category } = req.query;
  const q = {};
  if (tag) q.tags = tag;
  if (category) q.category = category;
  const posts = await BlogPost.find(q);
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  post.views++;
  await post.save();
  res.json(post);
});

router.post("/", protect, upload.single("image"), async (req, res) => {
  const words = req.body.content.split(" ").length;
  const readTime = Math.ceil(words / 200);

  const postData = {
    ...req.body,
    tags: req.body.tags?.split(","),
    readTime,
    author: req.user.id
  };

  if (req.file) {
    cloudinary.uploader.upload_stream({ folder: "blogs" },
      async (_, result) => {
        postData.imageUrl = result.secure_url;
        const post = await BlogPost.create(postData);
        res.json(post);
      }
    ).end(req.file.buffer);
  } else {
    const post = await BlogPost.create(postData);
    res.json(post);
  }
});

router.post("/:id/like", protect, async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post.likes.includes(req.user.id)) post.likes.push(req.user.id);
  await post.save();
  res.json(post);
});

router.post("/:id/comment", protect, async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  post.comments.push({ user: req.user.id, text: req.body.text });
  await post.save();
  res.json(post);
});

router.delete("/:id", protect, async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (post.author.toString() !== req.user.id && !req.user.isAdmin)
    return res.status(403).json({ message: "Not allowed" });

  await post.deleteOne();
  res.json({ message: "Deleted" });
});

export default router;
