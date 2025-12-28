import { useState } from "react";

export default function AIScheduler() {
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
    } catch {
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

    if (new Date(scheduleDate) < today) {
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

    alert("✅ Post added to calendar!");
    setAiResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl border p-8">
      <h1 className="text-3xl font-semibold text-gray-900">
        AI Scheduler
      </h1>
      <p className="text-gray-500 mt-1">
        Generate AI-powered content and schedule it directly.
      </p>

      <div className="space-y-4 mt-8">
        <Select
          label="Platform *"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />

        <Input
          label="Target Audience *"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />

        <Input
          label="Posting Goal *"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <Input
          label="Posting Date *"
          type="date"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
        />
      </div>

      <button
        onClick={generateSuggestions}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
      >
        {loading ? "🤖 Generating..." : "✨ Generate Suggestions"}
      </button>

      {aiResult && (
        <>
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs text-gray-500">Headline</p>
            <p className="font-semibold text-lg">
              {aiResult.headline}
            </p>

            <p className="text-xs text-gray-500 mt-3">
              Best Posting Time
            </p>
            <p className="font-semibold">
              ⏰ {aiResult.bestTime}
            </p>
          </div>

          {error && (
            <p className="text-red-600 mt-3">{error}</p>
          )}

          <button
            onClick={addToCalendar}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
          >
            📅 Add to Calendar
          </button>
        </>
      )}
    </div>
  );
}

/* -------- Inputs -------- */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium">
        {label}
      </label>
      <input
        {...props}
        className="mt-1 w-full border rounded-lg px-3 py-2"
      />
    </div>
  );
}

function Select({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium">
        {label}
      </label>
      <select
        {...props}
        className="mt-1 w-full border rounded-lg px-3 py-2"
      >
        <option>LinkedIn</option>
        <option>Twitter</option>
        <option>Blog</option>
      </select>
    </div>
  );
}
