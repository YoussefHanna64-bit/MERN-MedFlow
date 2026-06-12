import UpcomingAppointments from "../components/appointmentComponents/upcomingAppointments";
import AppointmentGreetingHeader from "../components/appointmentComponents/appointmentGreetingHeader";
import appointmentCalendarImg from "../assets/appointmentCalendar.svg";

const PatientAppointments = () => {
  return (
    <>
      <div
        className="bg-background min-h-screen px-8 py-8 font-body"
        style={{
          backgroundImage: `url(${appointmentCalendarImg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          backgroundSize: "550px",
        }}
      >
        <AppointmentGreetingHeader />
        <UpcomingAppointments />
      </div>
    </>
  );
};

export default PatientAppointments;
