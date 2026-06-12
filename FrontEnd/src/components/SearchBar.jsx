const SearchBar = ({
  searchInput,
  setSearchInput,
  isSearched,
  handleSearch,
  handleReset,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Find a Doctor</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1 w-full min-w-[200px]">
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base outline-none transition-all duration-200 focus:border-[#008080] focus:ring-4 focus:ring-[#008080]/10"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {isSearched && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 md:flex-none px-6 py-3 text-gray-600 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={handleSearch}
            className="flex-1 md:flex-none px-8 py-3 bg-[#008080] text-white rounded-lg font-medium hover:bg-[#006666] transition-colors shadow-sm cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
