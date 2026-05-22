const UpcomingHeader = () => {
  return (
    <>
      <div className="flex justify-between">
        <span className="text-xl font-semibold mb-4 text-gray-700">
          Upcoming Appointments
        </span>
        <div className="flex gap-1 ">
          <span className="text-gray-400">Today</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-gray-400 self-center mb-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default UpcomingHeader;
