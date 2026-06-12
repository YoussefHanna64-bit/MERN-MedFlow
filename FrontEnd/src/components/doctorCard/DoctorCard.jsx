import { useNavigate } from "react-router";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  if (!doctor) return null;

  const isAvailable = doctor.availability && doctor.availability.length > 0;

  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex gap-4 items-center border-b border-gray-100 pb-4">
        <img
          src={doctor.image || defaultImage}
          alt={doctor.user?.name || "Doctor"}
          className="w-[60px] h-[60px] rounded-full object-cover border-2 border-gray-200 p-1"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="m-0 text-lg font-bold text-gray-900">
              {doctor.user?.name || "Dr. Name"}
            </h4>

            <span className="text-sm text-gray-600 font-semibold bg-gray-50 px-2 py-0.5 rounded">
              ⭐ {doctor.rating || "New"}
            </span>
          </div>
          <p className="m-0 mt-1 text-[#008080] font-medium text-sm capitalize">
            {doctor.specialization || "Specialist"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <p className="m-0 text-sm text-gray-500 leading-relaxed line-clamp-2">
          {doctor.description ||
            "Experienced medical professional dedicated to providing excellent patient care."}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-semibold">Fee:</span>
          {doctor.fees || "TBD"}
        </div>
      </div>

      <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-100">
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isAvailable ? "Available" : "Busy"}
        </span>

        <button
          onClick={() =>
            navigate("/book-appointment", { state: { selectedDoctor: doctor } })
          }
          className="px-4 py-2 bg-[#008080] text-white border-none rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[#006666] cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
