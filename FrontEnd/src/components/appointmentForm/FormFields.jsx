import { useState, useEffect } from "react";
import MyDatePicker from "../DatePicker";

const FormFields = ({ inputData, setInputData }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [errors, setErrors] = useState({});

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  useEffect(() => {
    console.log(inputData);
  }, [inputData]);
  return (
    <>
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
                defaultValue=""
                required
                className="appearance-none bg-gray-100 border rounded-lg text-base block w-full pl-10 pr-10 py-2.5 mt-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
              >
                <option value="" disabled>
                  Select a doctor
                </option>
                <option value="6a073566eb14ce705a0401ed">Dr. Ali Azouz</option>
                <option value="John Due">Dr. John Doe</option>
                <option value="Jane Smith">Dr. Jane Smith</option>
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
        <div className="flex mt-12 gap-12 justify-center">
          <div>
            <label
              htmlFor="preferredDateID"
              className="text-gray-600 font-semibold"
            >
              Preferred Date
            </label>
            <MyDatePicker
              inputData={inputData}
              setInputData={setInputData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
          <div>
            <label
              htmlFor="AvailableTimeSlotsID"
              className="text-gray-600 font-semibold"
            >
              Available Time Slots
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <span
                  key={slot}
                  name="timeSlot"
                  className={`border p-1 rounded-lg text-sm text-center font-semibold cursor-pointer transition-colors
                    ${
                      selectedSlot === slot
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10"
                    }`}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setInputData({ ...inputData, timeSlot: slot });
                  }}
                >
                  {slot}
                </span>
              ))}
            </div>
            <input type="hidden" name="timeSlot" value={selectedSlot ?? ""} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormFields;
