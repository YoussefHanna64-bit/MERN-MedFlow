import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchDoctorAvailability } from "../redux/thunks/doctor/fetchDoctorAvailability";
import { updateDoctorAvailability } from "../redux/thunks/doctor/updateAvailability";
import api from "../redux/api";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DoctorAvailabilityPage = () => {
  const dispatch = useDispatch();
  const availability = useSelector((state) => state.doctor.availability);
  const loading = useSelector((state) => state.doctor.loading);
  const error = useSelector((state) => state.doctor.error);
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState("");
  const [slots, setSlots] = useState([
    { startTime: "09:00", endTime: "09:30", status: "available" },
  ]);

  useEffect(() => {
    dispatch(fetchDoctorAvailability());
  }, [dispatch]);

  // Auto-calculate day from selected date
  const getDay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    return DAYS[date.getDay()];
  };

  const selectedDay = getDay(selectedDate);

  const handleAddSlot = () => {
    setSlots([
      ...slots,
      { startTime: "10:00", endTime: "10:30", status: "available" },
    ]);
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

    if (!selectedDate || slots.length === 0) {
      toast.error("Please select a date and add time slots");
      return;
    }

    try {
      const result = await dispatch(
        updateDoctorAvailability({
          action: "update",
          date: selectedDate,
          day: selectedDay,
          location: location || "Main Clinic",
          slots,
        }),
      );

      if (updateDoctorAvailability.fulfilled.match(result)) {
        toast.success("Availability updated successfully!");
        setSelectedDate("");
        setLocation("");
        setSlots([
          { startTime: "09:00", endTime: "09:30", status: "available" },
        ]);
        dispatch(fetchDoctorAvailability());
      } else {
        toast.error(result.payload || "Failed to update availability");
      }
    } catch (error) {
      toast.error("An error occurred while updating availability");
      console.error(error);
    }
  };

  const handleDeleteSlot = async (date, startTime) => {
    if (!window.confirm("Are you sure you want to delete this slot?")) {
      return;
    }

    try {
      const result = await dispatch(
        updateDoctorAvailability({
          action: "cancel",
          date,
          startTime,
        }),
      );

      if (updateDoctorAvailability.fulfilled.match(result)) {
        toast.success("Slot deleted successfully!");
        dispatch(fetchDoctorAvailability());
      } else {
        toast.error(result.payload || "Failed to delete slot");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the slot");
      console.error(error);
    }
  };

  if (loading && (!availability || availability.length === 0)) {
    return (
      <div className="min-h-screen bg-[#f0fafa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
          <p className="text-primary font-medium text-sm">
            Loading your availability...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fafa] via-white to-[#e6f6f7] py-12 px-4">
      <div className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-[#00a8b2] to-primary" />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Manage Your Availability
          </h1>
          <p className="text-slate-600">
            Update your clinic schedules and manage appointment slots
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add/Update Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden"
            >
              <div className="bg-linear-to-r from-primary to-[#00a8b2] px-8 py-5">
                <p className="text-white/90 text-xl font-semibold">
                  Add or Update Slots
                </p>
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
                        <span className="font-semibold text-primary text-sm">
                          {selectedDay}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Main Clinic"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                  />
                </div>

                {/* Slots */}
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
                      <div key={index} className="flex gap-3 items-end">
                        <div className="flex-1">
                          <label className="text-xs text-slate-600 mb-1 block">
                            Start Time
                          </label>
                          <input
                            type="time"
                            value={slot.startTime}
                            onChange={(e) =>
                              handleSlotChange(
                                index,
                                "startTime",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-slate-600 mb-1 block">
                            End Time
                          </label>
                          <input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) =>
                              handleSlotChange(index, "endTime", e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSlot(index)}
                          className="px-3 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all text-sm font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-[#006970] active:bg-[#005a60] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3.5 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
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
          </div>

          {/* Current Availability */}
          <div className="lg:col-span-1">
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
                            <p className="font-semibold text-slate-800 text-sm">
                              {day.day}
                            </p>
                            <p className="text-xs text-slate-500">
                              {new Date(day.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">
                          📍 {day.location}
                        </p>
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
                                  onClick={() =>
                                    handleDeleteSlot(day.date, slot.startTime)
                                  }
                                  className="text-rose-600 hover:text-rose-700 text-xs font-semibold"
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
                    <p className="text-slate-500 text-sm">
                      No availability yet
                    </p>
                    <p className="text-slate-400 text-xs mt-1">
                      Add your first schedule above
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilityPage;
