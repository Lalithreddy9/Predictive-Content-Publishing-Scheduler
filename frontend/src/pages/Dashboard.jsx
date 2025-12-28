import { useEffect, useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Linkedin,
  Twitter,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics/summary")
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error("Analytics error:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Posts error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Overview of your content performance.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Likes"
            value={metrics.totalLikes}
            Icon={ThumbsUp}
          />
          <MetricCard
            title="Total Comments"
            value={metrics.totalComments}
            Icon={MessageCircle}
          />
          <MetricCard
            title="Total Shares"
            value={metrics.totalShares}
            Icon={Share2}
          />
        </div>

        {/* Content Performance */}
        <div className="bg-white rounded-2xl border p-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Content Performance
          </h2>
          <p className="text-gray-500 mt-1">
            Overview of your recent content engagement.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b">
                <tr>
                  <th className="text-left pb-4">Title</th>
                  <th className="text-left pb-4">Platform</th>
                  <th className="text-center pb-4">Likes</th>
                  <th className="text-center pb-4">Comments</th>
                  <th className="text-center pb-4">Shares</th>
                  <th className="text-center pb-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-6 font-medium text-gray-900">
                      {post.title}
                    </td>

                    <td className="text-gray-600">
                      <PlatformIcon platform={post.platform} />
                    </td>

                    <td className="text-center">{post.likes}</td>
                    <td className="text-center">{post.comments}</td>
                    <td className="text-center">{post.shares}</td>

                    <td className="text-center">
                      <StatusBadge status={post.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function MetricCard({ title, value, Icon }) {
  return (
    <div className="bg-white rounded-2xl border p-6 relative">
      <Icon
        size={20}
        className="absolute top-6 right-6 text-gray-300"
      />
      <p className="text-gray-600">{title}</p>
      <p className="text-3xl font-semibold text-gray-900 mt-3">
        {value}
      </p>
      <p className="text-sm text-gray-400 mt-1">
        + from last month
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className="px-4 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
      {status}
    </span>
  );
}

function PlatformIcon({ platform }) {
  if (platform === "LinkedIn") {
    return (
      <div className="flex items-center gap-2">
        <Linkedin size={16} className="text-blue-600" />
        LinkedIn
      </div>
    );
  }

  if (platform === "Twitter") {
    return (
      <div className="flex items-center gap-2">
        <Twitter size={16} className="text-sky-500" />
        Twitter
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <FileText size={16} className="text-gray-500" />
      Blog
    </div>
  );
}
