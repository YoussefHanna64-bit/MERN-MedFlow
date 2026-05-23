import MyDatePicker from "../DatePicker";

const FormFields = () => {
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

              <input
                type="text"
                id="doctor"
                className="bg-gray-100 border rounded-lg text-base placeholder:text-gray-700 placeholder:font-semibold block w-full pl-10 pr-3 py-2.5 mt-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
                placeholder="Dr. Ali Azouz"
                required
              />
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="reasonID" className="text-gray-600 font-semibold">
              Reason for the Visit
            </label>
            <textarea
              name="reason"
              id="reasonID"
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
            <MyDatePicker />
          </div>
          <div>
            <label
              htmlFor="AvailableTimeSlotsID"
              className="text-gray-600 font-semibold"
            >
              Available Time Slots
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <span className="border p-1 rounded-lg text-sm text-center font-semibold">
                09:00 AM - 10:00 AM
              </span>
              <span className="border p-1 rounded-lg text-sm text-center font-semibold">
                10:00 AM - 11:00 AM
              </span>
              <span className="border p-1 rounded-lg text-sm text-center font-semibold">
                11:00 AM - 12:00 PM
              </span>
              <span className="border p-1 rounded-lg text-sm text-center font-semibold">
                12:00 PM - 1:00 PM
              </span>
              <span className="border p-1 rounded-lg text-sm text-center font-semibold">
                1:00 PM - 2:00 PM
              </span>
              <span className="border p-1 rounded-lg text-sm text-center bg-primary text-white font-semibold">
                2:00 PM - 3:00 PM
              </span>
              <span className="border p-1 rounded-lg text-sm text-center font-semibold">
                3:00 PM - 4:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormFields;
