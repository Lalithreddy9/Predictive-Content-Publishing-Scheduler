import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import SchedulePostModal from "../components/SchedulePostModal";
import EventDetailsModal from "../components/EventDetailsModal";
import { DownloadCloud, Plus } from "lucide-react";
import "../styles/calendar.css";

export default function CalendarPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((post) => ({
          id: post._id,
          title: post.title,
          start: `${post.scheduledDate}T${post.scheduledTime}`,
        }));
        setEvents(formatted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-white border rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold">Content Calendar</h1>
          <p className="text-gray-500 mt-1">
            Plan and manage your scheduled posts.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              window.open(
                "http://localhost:5000/api/posts/export/csv",
                "_blank"
              )
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
          >
            <DownloadCloud size={16} className="mr-2" />
            Export CSV
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Plus size={16} className="mr-2" />
            New Post
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border shadow-sm p-4">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          events={events}
          eventDisplay="block"
          eventColor="#DBEAFE"
          eventTextColor="#1E40AF"
          eventClassNames="cursor-pointer hover:opacity-90 transition"
          dayMaxEventRows={3}
          height="auto"
          editable
          eventClick={(info) => {
            setSelectedEvent({
              title: info.event.title,
              date: info.event.startStr.split("T")[0],
              time: info.event.startStr.split("T")[1]?.slice(0, 5),
            });
          }}
          dateClick={(info) => {
            setSelectedEvent({
              date: info.dateStr,
              empty: true,
            });
          }}
          eventDrop={(info) => {
            const [date, time] = info.event.startStr.split("T");

            fetch(`http://localhost:5000/api/posts/${info.event.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                scheduledDate: date,
                scheduledTime: time.slice(0, 5),
              }),
            });
          }}
        />
      </div>

      {showModal && (
        <SchedulePostModal
          onClose={() => setShowModal(false)}
          onSave={(post) =>
            setEvents((prev) => [
              ...prev,
              {
                id: post._id,
                title: post.title,
                start: `${post.scheduledDate}T${post.scheduledTime}`,
              },
            ])
          }
        />
      )}

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
