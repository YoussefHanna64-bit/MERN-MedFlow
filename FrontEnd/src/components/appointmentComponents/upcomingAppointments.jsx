import UpcomingHeader from "./upcomingHeader";
import AppointmentCardList from "./appointmentCardList";
import AppointmentsHeader from "./appointmentsHeader";

const UpcomingAppointments = () => {
  return (
    <>
      <div className="bg-white/30 mt-5 p-8 shadow-lg rounded-xl">
        <UpcomingHeader />
        <AppointmentsHeader />
        <AppointmentCardList />
      </div>
    </>
  );
};

export default UpcomingAppointments;
