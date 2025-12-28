import express from "express";
import Post from "../models/post.js";
import { Parser } from "json2csv";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

/* GET ALL */
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ scheduledDate: 1 });
  res.json(posts);
});

/* UPDATE (DRAG & DROP) */
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.scheduledDate = req.body.scheduledDate;
  post.scheduledTime = req.body.scheduledTime;

  await post.save();
  res.json(post);
});

/* EXPORT CSV (NO ####### ISSUE) */
router.get("/export/csv", async (req, res) => {
  const posts = await Post.find();

  const formatted = posts.map((p) => ({
    Title: p.title,
    Platform: p.platform,
    "Scheduled At": `${p.scheduledDate} ${p.scheduledTime}`,
    Status: p.status,
  }));

  const parser = new Parser();
  const csv = parser.parse(formatted);

  res.header("Content-Type", "text/csv");
  res.attachment("scheduled-posts.csv");
  res.send(csv);
});

export default router;
