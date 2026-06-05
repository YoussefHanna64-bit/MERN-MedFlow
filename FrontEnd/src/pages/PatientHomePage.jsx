import { useNavigate } from "react-router";

const PatientHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F6F5] p-6 flex flex-col items-center justify-center font-body">
      <div className="max-w-2xl bg-white p-10 md:p-14 rounded-[2rem] shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 bg-[#E6F3F3] text-[#008484] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            width="40"
            height="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Welcome to Patient Home!
        </h1>

        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          We are thrilled to have you on MedFlow. From here, you can easily
          discover specialists, manage your medical records, and book your
          upcoming clinical visits.
        </p>

        <button
          onClick={() => navigate("/find-doctor")}
          className="bg-[#008484] text-white px-10 py-4 rounded-full font-semibold hover:bg-teal-700 transition-colors shadow-md flex items-center justify-center mx-auto gap-2"
        >
          Find a Doctor Now
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PatientHomePage;
