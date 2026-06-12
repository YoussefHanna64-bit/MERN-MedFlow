import { Link } from "react-router";
import UpcomingAppointments from "../components/appointmentComponents/upcomingAppointments";
import AppointmentGreetingHeader from "../components/appointmentComponents/appointmentGreetingHeader";
import AppointmentVisits from "../components/appointmentComponents/appointmentVisits";

const DoctorAppointments = () => {
  return (
    <>
      <div className="bg-background min-h-screen px-8 py-8 font-body">
        <div className="flex items-center justify-between mb-8">
          <div>
            <AppointmentGreetingHeader />
          </div>
          <Link
            to="/doctor-availability"
            className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-primary to-[#00a3ac] px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-teal-700 hover:-translate-y-0.5"
          >
            <span>📅</span>
            Manage Availability
          </Link>
        </div>
        <div>
          <AppointmentVisits />
        </div>
        <UpcomingAppointments />
      </div>
    </>
  );
};

export default DoctorAppointments;
