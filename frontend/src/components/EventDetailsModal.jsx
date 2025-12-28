export default function EventDetailsModal({ event, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900">
          Scheduled Details
        </h2>

        <div className="mt-4 space-y-3 text-sm">
          <p>
            <span className="font-medium">Date:</span> {event.date}
          </p>

          {event.time && (
            <p>
              <span className="font-medium">Time:</span> {event.time}
            </p>
          )}

          {event.title ? (
            <p>
              <span className="font-medium">Title:</span> {event.title}
            </p>
          ) : (
            <p className="text-gray-500">
              No posts scheduled for this date.
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
