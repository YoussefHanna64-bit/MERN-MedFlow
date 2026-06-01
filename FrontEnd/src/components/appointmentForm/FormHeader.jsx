const FormHeader = () => {
  return (
    <>
      <div className="flex gap-3">
        <div className="text-primary bg-teal-500/10 p-2 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7 "
          >
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <span className="text-2xl font-semibold text-gray-800">
            Book Appointment
          </span>
          <span className="block text-sm">
            Complete the clinical intake from below to secure your slot
          </span>
        </div>
      </div>
    </>
  );
};

export default FormHeader;
