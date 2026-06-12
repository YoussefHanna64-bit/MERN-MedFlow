import { Link } from "react-router";
import UpcomingAppointments from "../components/appointmentComponents/upcomingAppointments";
import AppointmentGreetingHeader from "../components/appointmentComponents/appointmentGreetingHeader";
import AppointmentVisits from "../components/appointmentComponents/appointmentVisits";
import { FileText, Calendar as CalendarIcon } from "lucide-react"; // Import Icons

const DoctorAppointments = () => {
  return (
    <>
      <div className="bg-background min-h-screen px-8 py-8 font-body">
        <div className="flex items-center justify-between mb-8">
          <div>
            <AppointmentGreetingHeader />
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/doctor-records"
              className="flex items-center gap-2 rounded-2xl bg-white border-2 border-[#E6F3F3] text-[#008484] px-6 py-3 text-sm font-semibold shadow-sm transition duration-200 hover:bg-[#E6F3F3] hover:border-[#008484]"
            >
              <FileText className="w-4 h-4" />
              Patient Records
            </Link>

            <Link
              to="/doctor-availability"
              className="flex items-center gap-2 rounded-2xl bg-[#008484] px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-teal-700 hover:-translate-y-0.5"
            >
              <CalendarIcon className="w-4 h-4" />
              Manage Availability
            </Link>
          </div>
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
