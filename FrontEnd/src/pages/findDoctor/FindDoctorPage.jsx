import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../components/searchbar/SearchBar";
import DoctorCard from "../../components/doctorCard/DoctorCard";
import "./FindDoctorPage.css";

const FindDoctorPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5000/api/doctors");
        const fetchedDoctors = res.data.data.doctors;

        setAllDoctors(fetchedDoctors);
        setFilteredDoctors(fetchedDoctors);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError(
          "Could not load doctors. Please ensure the backend server is running on port 5000.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = () => {
    if (!searchInput.trim()) {
      setFilteredDoctors(allDoctors);
      setIsSearched(false);
      return;
    }

    const searchTerm = searchInput.toLowerCase();
    const results = allDoctors.filter((doc) => {
      const nameMatch =
        doc.user && doc.user.name.toLowerCase().includes(searchTerm);
      const specMatch =
        doc.specialization &&
        doc.specialization.toLowerCase().includes(searchTerm);
      return nameMatch || specMatch;
    });

    setFilteredDoctors(results);
    setIsSearched(true);
  };

  const handleReset = () => {
    setSearchInput("");
    setFilteredDoctors(allDoctors);
    setIsSearched(false);
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
        <h3 className="results-header">Results ({filteredDoctors.length})</h3>

        {isLoading && (
          <p className="loading-text">Loading doctors from database...</p>
        )}
        {error && <p className="error-text">{error}</p>}

        {!isLoading && !error && (
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}

        {!isLoading && !error && filteredDoctors.length === 0 && (
          <p className="no-results">No doctors match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FindDoctorPage;
