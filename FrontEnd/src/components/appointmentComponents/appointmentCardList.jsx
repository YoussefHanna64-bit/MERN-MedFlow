import AppointmentCard from "./appointmentCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDoctorAppointments } from "./../../redux/slices/doctorAppointmentsSlice";
import Spinner from "../spinner";
import ErrorMessage from "../ErrorMessage";

const AppointmentCardList = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.doctorAppointments.loading);
  const error = useSelector((state) => state.doctorAppointments.error);
  const success = useSelector((state) => state.doctorAppointments.success);
  const appointments = useSelector(
    (state) => state.doctorAppointments.doctorAppointments,
  );

  useEffect(() => {
    if (!success) {
      dispatch(fetchDoctorAppointments());
    }
  }, [dispatch, success]);
  
  if (loading) return <Spinner />;
  if (error)
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchDoctorAppointments())}
      />
    );
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
