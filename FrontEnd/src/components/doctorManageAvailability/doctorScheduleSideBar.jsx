import React from "react";

const ScheduleSidebar = ({ availability, onDeleteSlot }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden sticky top-8">
      <div className="bg-linear-to-r from-primary to-[#00a8b2] px-6 py-4">
        <p className="text-white/90 font-semibold">Current Schedule</p>
      </div>

      <div className="p-6 max-h-[600px] overflow-y-auto">
        {availability && availability.length > 0 ? (
          <div className="space-y-4">
            {availability.map((day, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{day.day}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(day.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-2">📍 {day.location}</p>
                
                <div className="space-y-1">
                  {day.slots && day.slots.length > 0 ? (
                    day.slots.map((slot, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex justify-between items-center bg-slate-50 p-2 rounded text-xs"
                      >
                        <span className="font-medium">
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <button
                          onClick={() => onDeleteSlot(day.date, slot.startTime)}
                          className="text-rose-600 hover:text-rose-700 text-xs font-semibold px-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">No slots</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No availability yet</p>
            <p className="text-slate-400 text-xs mt-1">Add your first schedule above</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleSidebar;