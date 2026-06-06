import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const FindDoctor = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleNavigation = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 relative z-20 -mt-8 pb-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Find A Doctor
          </h2>
          <p className="text-gray-500 text-sm">
            Discover and book appointments with our top specialists.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button
            onClick={() => handleNavigation("/find-doctor")}
            className="bg-[#008484] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex-1 md:flex-none text-center shadow-md"
          >
            Find a Doctor
          </button>
          <button
            onClick={() => handleNavigation("/book-appointment")}
            className="bg-[#E6F3F3] text-[#008484] px-8 py-3.5 rounded-lg font-semibold hover:bg-[#d0ecec] transition-colors flex-1 md:flex-none text-center"
          >
            Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindDoctor;
