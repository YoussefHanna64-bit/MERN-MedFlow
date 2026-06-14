import { useState, useEffect } from "react";

const FormFields = ({
  inputData,
  setInputData,
  passedDoctor,
  doctors = [],
  loading,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [errors, setErrors] = useState({});
  const selectedDoctor = doctors.find((doc) => doc._id === inputData.doctorId);
  const availableSlots =
    selectedDoctor?.availability?.flatMap((avail) =>
      avail.slots
        .filter((slot) => slot.status === "available")
        .map((slot) => ({
          label: `${slot.startTime} - ${slot.endTime}`,
          day: avail.day,
          date: avail.date,
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
    ) ?? [];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "doctorId") {
      setSelectedSlot(null);
      setInputData((prev) => ({
        ...prev,
        doctorId: value,
        timeSlot: "",
        day: "",
        date: "",
      }));
      return;
    }

    setInputData({ ...inputData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  useEffect(() => {
    console.log(inputData);
  }, [inputData]);


  useEffect(() => {
    if (passedDoctor) {
      setInputData((prev) => ({ ...prev, doctorId: passedDoctor._id }));
    }
  }, [passedDoctor]);

  return (
    <>
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex gap-5 mt-12">
            <div className="w-1/2">
              <label htmlFor="doctor" className="text-gray-600 font-semibold">
                Select Medical Professional
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <select
                  id="doctor"
                  name="doctorId"
                  onChange={handleOnChange}
                  value={inputData.doctorId}
                  required
                  className="appearance-none bg-gray-100 border rounded-lg text-base block w-full pl-10 pr-10 py-2.5 mt-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
                >
                  <option value="" disabled>
                    {loading ? "Loading doctors..." : "Select a doctor"}
                  </option>
                  {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.user?.name}
                    </option>
                  ))}
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <label htmlFor="reasonID" className="text-gray-600 font-semibold">
                Reason for the Visit
              </label>
              <textarea
                name="reason"
                id="reasonID"
                onChange={handleOnChange}
                rows="4"
                placeholder="Describe symptoms or primary concern..."
                className="bg-gray-100 border rounded-lg text-base min-h-12 max-h-32 h-12 placeholder:text-gray-400 placeholder:font-semibold block w-full pl-4 pr-3 py-2.5 mt-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
              ></textarea>
            </div>
          </div>

          <div className="mt-8 justify-start">
            <div>
              <label
                htmlFor="AvailableTimeSlotsID"
                className="text-gray-600 font-semibold"
              >
                Available Time Slots
              </label>
              {inputData.doctorId && availableSlots.length === 0 && (
                <p className="mt-2 text-sm text-red-400 font-semibold">
                  No available slots for this doctor.
                </p>
              )}
              <div className="mt-2 grid grid-cols-2 gap-2">
                {availableSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.label;
                  return (
                    <span
                      key={`${slot.day}-${slot.startTime}`}
                      onClick={() => {
                        setSelectedSlot(slot.label);
                        setInputData((prev) => ({
                          ...prev,
                          timeSlot: slot.label,
                          day: slot.day,
                          date: slot.date,
                        }));
                      }}
                      className={`border p-2 rounded-lg text-sm text-center font-semibold cursor-pointer transition-colors flex flex-col
                     ${isSelected ? "bg-primary text-white" : "hover:bg-primary/10"}`}
                    >
                      <span
                        className={`text-xs ${isSelected ? "opacity-80" : "text-black"}`}
                      >
                        {slot.day} ·{" "}
                        {new Date(slot.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span>{slot.label}</span>
                    </span>
                  );
                })}
              </div>
              <input type="hidden" name="timeSlot" value={selectedSlot ?? ""} />
            </div>
          </div>
        </div>

        <div className="mt-10 p-5 bg-teal-50/40 border border-teal-100/80 rounded-xl">
          <div className="flex items-center gap-2 text-teal-800 font-bold mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-teal-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 111.063 1.06l-.041.02a.75.75 0 01-1.063-1.06zm0 0v6m-4.5 1.5H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0112 3m0 0c2.917 0 5.747.294 8.5.862m-21 10.398c0-.552.448-1 1-1h6.25a1 1 0 011 1v3.83a1 1 0 01-1 1H2.5a1 1 0 01-1-1v-3.83z"
              />
            </svg>
            Important Booking Information
          </div>
          <ul className="text-sm text-gray-600 space-y-2 list-inside list-disc pl-1">
            <li>
              Please arrive{" "}
              <span className="font-semibold text-gray-800">
                15 minutes early
              </span>{" "}
              to complete any additional intake steps.
            </li>
            <li>
              If a{" "}
              <span className="font-semibold text-gray-800">
                Lab Service Deposit
              </span>{" "}
              is added, it will be fully credited toward any tests prescribed
              during the visit.
            </li>
            <li>
              Cancellations or modifications can be made up to{" "}
              <span className="font-semibold text-gray-800">
                24 hours prior
              </span>{" "}
              to your scheduled time without penalty.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default FormFields;
