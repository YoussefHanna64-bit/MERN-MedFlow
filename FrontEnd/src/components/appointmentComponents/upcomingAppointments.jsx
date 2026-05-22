import UpcomingHeader from "./upcomingHeader";
import AppointmentCardList from "./appointmentCardList";

const UpcomingAppointments = () => {
 
  return (
    <>
      <div className="bg-white mt-5 p-8 rounded-xl">
        <UpcomingHeader />
        <AppointmentCardList />
      </div>
    </>
  );
};

export default UpcomingAppointments;
