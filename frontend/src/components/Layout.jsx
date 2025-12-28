import { useState } from "react";
import Sidebar from "./Sidebar";
import AIScheduleModal from "./AIScheduleModal";

export default function Layout({ children }) {
  const [showAIModal, setShowAIModal] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar onOpenAI={() => setShowAIModal(true)} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* ✅ AI Scheduler Modal */}
      {showAIModal && (
        <AIScheduleModal
          onClose={() => setShowAIModal(false)}
          onPostCreated={() => window.location.reload()}
        />
      )}
    </div>
  );
}
