import React from "react";

const TimeSlotInput = ({ slot, index, onSlotChange, onRemoveSlot }) => {
  return (
    <div className="flex gap-3 items-end">
      <div className="flex-1">
        <label className="text-xs text-slate-600 mb-1 block">Start Time</label>
        <input
          type="time"
          value={slot.startTime}
          onChange={(e) => onSlotChange(index, "startTime", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          required
        />
      </div>
      <div className="flex-1">
        <label className="text-xs text-slate-600 mb-1 block">End Time</label>
        <input
          type="time"
          value={slot.endTime}
          onChange={(e) => onSlotChange(index, "endTime", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          required
        />
      </div>
      <button
        type="button"
        onClick={() => onRemoveSlot(index)}
        className="px-3 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all text-sm font-semibold"
      >
        Remove
      </button>
    </div>
  );
};

export default TimeSlotInput;