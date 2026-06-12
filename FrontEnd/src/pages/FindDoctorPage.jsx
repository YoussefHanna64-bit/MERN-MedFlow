import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import DoctorCard from "../components/doctorCard/DoctorCard";
import { searchDoctors } from "../redux/thunks/doctor/searchDoctors";
import { setDoctorSearchQuery } from "../redux/slices/doctorSlice";

const FindDoctorPage = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const doctors = useSelector((state) => state.doctor.doctors);
  const isLoading = useSelector((state) => state.doctor.loading);
  const error = useSelector((state) => state.doctor.error);

  useEffect(() => {
    dispatch(searchDoctors());
  }, [dispatch]);

  const handleSearch = () => {
    const input = searchInput.trim();
    dispatch(searchDoctors(input));
    dispatch(setDoctorSearchQuery(input));
    setIsSearched(!!input);
  };

  const handleReset = () => {
    setSearchInput("");
    setIsSearched(false);
    dispatch(setDoctorSearchQuery(""));
    dispatch(searchDoctors());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isSearched={isSearched}
          setIsSearched={setIsSearched}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </div>

      <div className="w-full max-w-[1000px]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Results ({doctors?.length || 0})
        </h3>

        {isLoading && (
          <p className="text-center text-gray-500 py-10">
            Loading doctors from database...
          </p>
        )}

        {error && <p className="text-center text-red-500 py-10">{error}</p>}

        {!isLoading && !error && doctors?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}

        {!isLoading && !error && doctors?.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No doctors match your search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindDoctorPage;
