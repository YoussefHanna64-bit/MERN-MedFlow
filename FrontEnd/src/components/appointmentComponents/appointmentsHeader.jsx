import { useSelector } from "react-redux";
const AppointmentsHeader = () => {
  const { role } = useSelector((state) => state.auth);
  const roleText = role === "doctor" ? "Patient Name" : "Doctor Name";
  return (
    <>
      <div className="grid grid-cols-[2fr_1fr_2fr_1fr_1fr] bg-[#f2f4f5] p-4 rounded-t-xl">
        <span className="font-semibold">{roleText}</span>
        <span className="font-semibold">Date</span>
        <span className="font-semibold">Time Slot</span>
        <span className="font-semibold">Status</span>
        <span className="font-semibold text-center">Actions</span>
      </div>
    </>
  );
};

export default AppointmentsHeader;
