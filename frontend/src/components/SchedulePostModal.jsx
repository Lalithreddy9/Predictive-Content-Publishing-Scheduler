  import { useState } from "react";

  export default function SchedulePostModal({ onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("LinkedIn");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("09:00");

    const handleSave = async () => {
      const scheduledAt = new Date(`${date}T${time}`);

      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          platform,
          scheduledAt,
          status: "Scheduled",
        }),
      });

      const savedPost = await res.json();
      onSave(savedPost);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-xl font-bold">Schedule New Post</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details for your new content.
          </p>

          <div className="space-y-4 mt-6">
            <Input
              label="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Select
              label="Platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              options={["LinkedIn", "Twitter", "Blog"]}
            />

            <Input
              label="Schedule Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <Input
              label="Schedule Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-black"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* -------- Reusable Inputs -------- */

  function Input({ label, ...props }) {
    return (
      <div>
        <label className="block text-sm font-medium">{label}</label>
        <input
          {...props}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>
    );
  }

  function Select({ label, options, ...props }) {
    return (
      <div>
        <label className="block text-sm font-medium">{label}</label>
        <select
          {...props}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }
