const AppointmentVisits = () => {
  return (
    <>
      <div className="bg-linear-to-l from-primary to-primary/33 p-5 rounded-xl">
        <span className="font-semibold text-xl text-gray-800">
          Visits for Today
        </span>
        <span className="block text-4xl font-bold my-2 text-gray-800">15</span>
        <div className="flex ">
          <div className=" bg-linear-to-r from-gray-300/80 to-gray-300/50  mt-2 mr-2 p-2 w-2xl rounded-2xl relative">
            <span className="text-gray-800 font-semibold">New Patients</span>
            <span className="block text-3xl font-semibold ">5</span>
            <div className="flex bg-green-300/60 text-green-600 font-semibold rounded-full shadow-xl/30 mb-3 mr-3  px-2 absolute bottom-0 right-0">
              <span>46%</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>
            </div>
          </div>
          <div className="bg-linear-to-r from-gray-300/80 to-gray-300/50 mt-2 mr-2  p-2 w-2xl  rounded-2xl relative">
            <span className="text-gray-800 font-semibold">Old Patients</span>
            <span className="block text-3xl font-semibold">10</span>
            <div className="flex bg-red-300/70 text-red-600 font-semibold rounded-full shadow-xl/30 mb-3 mr-3  px-2 absolute bottom-0 right-0">
              <span>52%</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentVisits;
