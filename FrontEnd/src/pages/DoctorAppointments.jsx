import UpcomingAppointments from "../components/appointmentComponents/upcomingAppointments";
import AppointmentGreetingHeader from "../components/appointmentComponents/appointmentGreetingHeader";
import AppointmentVisits from "../components/appointmentComponents/appointmentVisits";

const DoctorAppointments = () => {
  return (
    <>
      <div className="bg-background min-h-screen px-8 py-8 font-body">
        <div>
          <AppointmentGreetingHeader />
          <AppointmentVisits />
        </div>
        <UpcomingAppointments />
      </div>
    </>
  );
};

export default DoctorAppointments;
