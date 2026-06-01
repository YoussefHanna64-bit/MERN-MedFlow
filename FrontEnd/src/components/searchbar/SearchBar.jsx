const SearchBar = ({
  searchInput,
  setSearchInput,
  isSearched,
  setIsSearched,
  handleSearch,
  handleReset,
}) => {
  return (
    <div className="search-card">
      <h2>Find A Doctor</h2>
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search with name or speciality"
          className="search-input"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setIsSearched(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className={`search-btn ${isSearched ? "reset-mode" : ""}`}
          onClick={isSearched ? handleReset : handleSearch}
        >
          {isSearched ? "Reset" : "Search"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
