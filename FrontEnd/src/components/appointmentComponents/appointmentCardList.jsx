import AppointmentCard from "./appointmentCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDoctorAppointments } from "./../../redux/slices/doctorAppointmentsSlice";

const AppointmentCardList = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.doctorAppointments.loading);
  const error = useSelector((state) => state.doctorAppointments.error);
  const success = useSelector((state) => state.doctorAppointments.success);
  const appointments = useSelector(
    (state) => state.doctorAppointments.doctorAppointments,
  );
  ////// check on the role to fetch the correct data
  useEffect(() => {
    if (!success) {
      dispatch(fetchDoctorAppointments());
    }
  }, [dispatch, success]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="flex flex-col gap-3">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </>
  );
};

export default AppointmentCardList;
