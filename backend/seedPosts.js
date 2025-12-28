import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./models/post.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    await Post.deleteMany();

    const samplePosts = [
      // ----------- PUBLISHED POSTS -----------
      {
        title: "5 Tips to Improve Your LinkedIn Profile",
        platform: "LinkedIn",
        scheduledDate: "2025-01-10",
        scheduledTime: "09:00",
        likes: 520,
        comments: 84,
        shares: 31,
        status: "Published",
      },
      {
        title: "How AI Is Changing Software Jobs",
        platform: "LinkedIn",
        scheduledDate: "2025-01-15",
        scheduledTime: "10:00",
        likes: 780,
        comments: 142,
        shares: 67,
        status: "Published",
      },
      {
        title: "Top 10 Resume Mistakes Freshers Make",
        platform: "Twitter",
        scheduledDate: "2025-01-20",
        scheduledTime: "09:30",
        likes: 640,
        comments: 96,
        shares: 54,
        status: "Published",
      },
      {
        title: "Why Consistency Matters in Personal Branding",
        platform: "LinkedIn",
        scheduledDate: "2025-01-25",
        scheduledTime: "11:00",
        likes: 890,
        comments: 173,
        shares: 102,
        status: "Published",
      },
      {
        title: "Top Skills Recruiters Look for in 2025",
        platform: "Blog",
        scheduledDate: "2025-01-30",
        scheduledTime: "09:00",
        likes: 720,
        comments: 110,
        shares: 65,
        status: "Published",
      },

      // ----------- SCHEDULED POSTS -----------
      {
        title: "How to Build a Strong Developer Portfolio",
        platform: "Twitter",
        scheduledDate: "2025-02-05",
        scheduledTime: "09:00",
        status: "Scheduled",
      },
      {
        title: "AI Tools Every Software Engineer Should Know",
        platform: "LinkedIn",
        scheduledDate: "2025-12-29",
        scheduledTime: "10:00",
        status: "Scheduled",
      },
      {
        title: "How to Crack Technical Interviews in 2025",
        platform: "LinkedIn",
        scheduledDate: "2025-02-12",
        scheduledTime: "09:30",
        status: "Scheduled",
      },
      {
        title: "Why Side Projects Matter More Than CGPA",
        platform: "Blog",
        scheduledDate: "2026-01-15",
        scheduledTime: "11:00",
        status: "Scheduled",
      },
      {
        title: "Mistakes to Avoid in Your First Tech Job",
        platform: "LinkedIn",
        scheduledDate: "2025-12-31",
        scheduledTime: "09:00",
        status: "Scheduled",
      },
    ];

    await Post.insertMany(samplePosts);
    console.log("✅ Sample posts (published + scheduled) inserted successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
