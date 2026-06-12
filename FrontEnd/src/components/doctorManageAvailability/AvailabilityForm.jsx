import { useState } from "react";
import TimeSlotInput from "./TimeSlotInput";
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DoctorAvailabilityForm = ({ onSave, isLoading }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState("");
  const [slots, setSlots] = useState([
    { startTime: "09:00", endTime: "09:30", status: "available" },
  ]);

  const getDay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    return DAYS[date.getDay()];
  };

  const selectedDay = getDay(selectedDate);

  const handleAddSlot = () => {
    setSlots([...slots, { startTime: "10:00", endTime: "10:30", status: "available" }]);
  };

  const handleRemoveSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await onSave({
      date: selectedDate,
      day: selectedDay,
      location: location || "Main Clinic",
      slots,
    });

    if (success) {
      setSelectedDate("");
      setLocation("");
      setSlots([{ startTime: "09:00", endTime: "09:30", status: "available" }]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden"
    >
      <div className="bg-linear-to-r from-primary to-[#00a8b2] px-8 py-5">
        <p className="text-white/90 text-xl font-semibold">Add or Update Slots</p>
      </div>

      <div className="px-8 py-8 flex flex-col gap-5">
        {/* Date Selection */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Select Date <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
              required
            />
            {selectedDay && (
              <div className="flex items-center px-4 py-2.5 bg-primary/10 rounded-xl border border-primary/30">
                <span className="font-semibold text-primary text-sm">{selectedDay}</span>
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Main Clinic"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
          />
        </div>

        {/* Slots Generation Area */}
        <div className="border-t border-dashed border-slate-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-slate-700">
              Time Slots <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleAddSlot}
              className="text-xs font-semibold text-primary hover:text-[#006970] bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-all"
            >
              + Add Slot
            </button>
          </div>

          <div className="space-y-3">
            {slots.map((slot, index) => (
              <TimeSlotInput
                key={index}
                slot={slot}
                index={index}
                onSlotChange={handleSlotChange}
                onRemoveSlot={handleRemoveSlot}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || slots.length === 0}
          className="w-full bg-primary hover:bg-[#006970] active:bg-[#005a60] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3.5 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {"Saving..."}
            </>
          ) : (
            <>
              <span>✓</span>
              Save Availability
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default DoctorAvailabilityForm;