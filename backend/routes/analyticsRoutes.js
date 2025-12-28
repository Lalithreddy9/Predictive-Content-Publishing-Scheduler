import express from "express";
import Post from "../models/post.js";

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const result = await Post.aggregate([
      { $match: { status: "Published" } },
      {
        $group: {
          _id: null,
          totalLikes: { $sum: "$likes" },
          totalComments: { $sum: "$comments" },
          totalShares: { $sum: "$shares" },
        },
      },
    ]);

    res.json(
      result[0] || {
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0,
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Analytics failed" });
  }
});

export default router;
