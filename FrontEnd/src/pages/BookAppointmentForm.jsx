import FormFields from "../components/appointmentForm/FormFields";
import FormHeader from "../components/appointmentForm/FormHeader";
import FormSummary from "../components/appointmentForm/FormSummary";
import appointImg from "../assets/appointImg.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../redux/slices/appointmentFormSlice";

const BookAppointmentForm = () => {
  const dispatch = useDispatch();
  const { doctors = [], loading } = useSelector(
    (state) => state.appointmentForm,
  );
  const location = useLocation();
  const passedDoctor = location.state?.selectedDoctor;

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const [inputData, setInputData] = useState({
    doctorId: passedDoctor ? passedDoctor._id : "",
    reason: "",
    date: "",
    timeSlot: "",
  });

  return (
    <>
      <div className="bg-background min-h-screen p-16 font-body">
        <div className="grid grid-cols-8 gap-6">
          <div
            className="bg-white p-5 rounded-lg col-span-6"
            style={{
              backgroundImage: `url(${appointImg})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom right",
              backgroundSize: "500px",
            }}
          >
            <FormHeader />
            <FormFields
              inputData={inputData}
              setInputData={setInputData}
              passedDoctor={passedDoctor}
              doctors={doctors}
              loading={loading}
            />
          </div>
          <FormSummary inputData={inputData} doctors={doctors} />
        </div>
      </div>
    </>
  );
};

export default BookAppointmentForm;
