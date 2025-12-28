import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    platform: String,

    scheduledDate: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    scheduledTime: {
      type: String, // HH:mm
      default: "09:00",
    },

    status: {
      type: String,
      enum: ["Published", "Scheduled"],
      default: "Scheduled",
    },

    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
