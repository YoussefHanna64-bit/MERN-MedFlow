const AppointmentGreetingHeader = () => {
  return (
    <>
      <div className="mb-3">
        <span className="text-xl mr-2 text-gray-800 font-semibold">
          Good Morning
        </span>
        {/* check on the role to display the correct greeting */}
        <span className="text-2xl text-primary font-bold">Dr. Ali!</span>
      </div>
    </>
  );
};

export default AppointmentGreetingHeader;
