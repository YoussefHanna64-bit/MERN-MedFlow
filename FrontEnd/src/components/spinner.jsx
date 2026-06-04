const Spinner = ({ color, height }) => {
  return (
    <>
      <div className={`flex items-center justify-center ${height}`}>
        <div
          className={`h-6 w-6 animate-spin rounded-full border-4 border-t-transparent ${color}`}
        ></div>
      </div>
    </>
  );
};

export default Spinner;
