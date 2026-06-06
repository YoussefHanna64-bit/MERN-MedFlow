import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import DoctorCard from "../../components/doctorCard/DoctorCard";
import "./FindDoctorPage.css";
import {
  searchDoctors,
  setDoctorSearchQuery,
} from "../../redux/slices/doctorSlice";

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
    <div className="find-doctor-page">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        isSearched={isSearched}
        setIsSearched={setIsSearched}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />

      <div className="results-container">
        <h3 className="results-header">Results ({doctors.length})</h3>

        {isLoading && (
          <p className="loading-text">Loading doctors from database...</p>
        )}
        {error && <p className="error-text">{error}</p>}

        {!isLoading && !error && (
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}

        {!isLoading && !error && doctors.length === 0 && (
          <p className="no-results">No doctors match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FindDoctorPage;
