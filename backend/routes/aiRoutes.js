import express from "express";
import Post from "../models/post.js";

const router = express.Router();

router.post("/suggest", async (req, res) => {
  try {
    const { platform, audience, goal } = req.body;

    // 1️⃣ Fetch previous high-level post data
    const history = await Post.find({ status: "Published" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title platform likes comments shares scheduledTime");

    // Format history for AI
    const historyText =
      history.length > 0
        ? history
            .map(
              (p, i) =>
                `${i + 1}. "${p.title}" | ${p.platform} | Likes: ${
                  p.likes
                }, Comments: ${p.comments}, Shares: ${
                  p.shares
                }, Time: ${p.scheduledTime}`
            )
            .join("\n")
        : "No previous posts available.";

    // 2️⃣ STRONG PROMPT with history + time reasoning
    const prompt = `
You are a senior content strategist and social media growth expert.

Your task:
- Analyze previous post performance
- Generate ONE improved, high-impact headline
- Suggest the BEST posting time (24h format, HH:MM)

Rules for headline:
- Sound authoritative and important
- Avoid "How to", "Using AI", "Can Achieve"
- Avoid repeating previous topics
- Prefer insight or strong opinion
- Max 12 words

Rules for time:
- Choose based on engagement patterns
- Return realistic professional posting times
- LinkedIn: business hours
- Twitter: midday or evening
- Blog: morning

Context:
Platform: ${platform}
Audience: ${audience}
Goal: ${goal}

Previous Posts Performance:
${historyText}

Respond STRICTLY in this JSON format:
{
  "headline": "<headline here>",
  "bestTime": "HH:MM"
}
`;

    // 3️⃣ Call OpenRouter (REAL AI)
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    // 4️⃣ Safe extraction
    let headline = "AI suggestion unavailable";
    let bestTime = "10:00";

    if (data?.choices?.length > 0) {
      const content = data.choices[0].message.content;

      try {
        const parsed = JSON.parse(content);
        headline = parsed.headline || headline;
        bestTime = parsed.bestTime || bestTime;
      } catch {
        // fallback if AI returns plain text
        headline = content.trim();
      }
    }

    res.json({ headline, bestTime });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI suggestion failed" });
  }
});

export default router;
