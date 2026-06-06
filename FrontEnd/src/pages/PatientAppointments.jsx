import UpcomingAppointments from "../components/appointmentComponents/upcomingAppointments";
import AppointmentGreetingHeader from "../components/appointmentComponents/appointmentGreetingHeader";

const PatientAppointments = () => {
  return (
    <>
      <div className="bg-background min-h-screen px-8 py-8 font-body">
        <div>
          <AppointmentGreetingHeader />
        </div>
        <UpcomingAppointments />
      </div>
    </>
  );
};

export default PatientAppointments;
