import { useState } from "react";

export default function AIScheduleModal({ onClose, onPostCreated }) {
  const [platform, setPlatform] = useState("LinkedIn");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState("");

  const generateSuggestions = async () => {
    setLoading(true);
    setAiResult(null);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, audience, goal }),
      });

      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      alert("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  const addToCalendar = async () => {
    if (!scheduleDate) {
      setError("Please select a posting date.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(scheduleDate);

    if (selectedDate < today) {
      setError("You cannot schedule a post in the past.");
      return;
    }

    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: aiResult.headline,
        platform,
        scheduledDate: scheduleDate,
        scheduledTime: aiResult.bestTime,
        status: "Scheduled",
      }),
    });

    onPostCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold">AI-Powered Scheduling</h2>
        <p className="text-gray-500 text-sm mt-1">
          Generate a headline and schedule it on your calendar.
        </p>

        {/* Inputs */}
        <div className="space-y-4 mt-6">
          <Select
            label="Platform"
            required
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            options={["LinkedIn", "Twitter", "Blog"]}
          />

          <Input
            label="Target Audience"
            required
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />

          <Input
            label="Posting Goal"
            required
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <Input
            label="Posting Date"
            type="date"
            required
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
          />
        </div>

        <button
          onClick={generateSuggestions}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "🤖 Generating..." : "✨ Generate Suggestions"}
        </button>

        {aiResult && (
          <>
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-500">Suggested Headline</p>
                <p className="font-semibold">{aiResult.headline}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Best Posting Time</p>
                <p className="font-semibold">
                  ⏰ {aiResult.bestTime}
                </p>
              </div>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              onClick={addToCalendar}
              className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
            >
              📅 Add to Calendar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Inputs ---------- */

function Input({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...props}
        required={required}
        className="mt-1 w-full border rounded-lg px-3 py-2"
      />
    </div>
  );
}

function Select({ label, options, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        {...props}
        required={required}
        className="mt-1 w-full border rounded-lg px-3 py-2"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
