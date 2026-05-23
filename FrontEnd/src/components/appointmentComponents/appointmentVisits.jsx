const AppointmentVisits = () => {
  return (
    <>
      <div className="bg-linear-to-l from-primary to-primary/33 p-5 shadow-lg rounded-xl">
        <div className="flex gap-2 items-center">
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
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>

          <span className="font-semibold text-xl text-gray-800">
            Visits for Today
          </span>
        </div>

        <span className="block text-4xl font-bold my-2 text-gray-800">15</span>
        <div className="flex">
          <div className=" bg-linear-to-r from-gray-300/80 to-gray-300/50  mt-2 mr-2 p-4 w-2xl rounded-2xl relative">
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="text-gray-800 font-semibold">New Patients</span>
            </div>
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
          <div className="bg-linear-to-r from-gray-300/80 to-gray-300/50 mt-2 mr-2  p-4 w-2xl  rounded-2xl relative">
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="text-gray-800 font-semibold">
                Returning Patients
              </span>
            </div>
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
