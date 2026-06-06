import AppointmentCard from "./appointmentCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchDoctorAppointments,
  fetchPatientAppointments,
} from "./../../redux/slices/userAppointmentsSlice";
import Spinner from "../spinner";
import ErrorMessage from "../ErrorMessage";

const AppointmentCardList = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.userAppointments.loading);
  const error = useSelector((state) => state.userAppointments.error);
  const success = useSelector((state) => state.userAppointments.success);
  const appointments = useSelector(
    (state) => state.userAppointments.userAppointments ?? [],
  );

  useEffect(() => {
    if (!success) {
      if (role == "doctor") {
        dispatch(fetchDoctorAppointments());
      } else {
        dispatch(fetchPatientAppointments());
      }
    }
  }, [dispatch, success]);

  if (loading) return <Spinner height="h-20" color="border-primary" />;
  if (error)
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchDoctorAppointments())}
      />
    );
  return (
    <>
      {appointments.length == 0 && (
        <div className="bg-primary/50 p-2 rounded-b-xl text-center">
          <span className="font-semibold">
            There is no upcoming appointments for you!
          </span>
        </div>
      )}
      <div>
        {appointments.map((appointment, index) => (
          <AppointmentCard
            key={appointment._id}
            appointment={appointment}
            isLast={index === appointments.length - 1}
          />
        ))}
      </div>
    </>
  );
};

export default AppointmentCardList;
