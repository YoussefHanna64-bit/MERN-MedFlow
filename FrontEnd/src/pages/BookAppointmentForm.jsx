import FormFields from "../components/appointmentForm/FormFields";
import FormHeader from "../components/appointmentForm/FormHeader";
import FormSummary from "../components/appointmentForm/FormSummary";
import appointImg from "../assets/appointImg.svg";
import { useState } from "react";
import { useLocation } from "react-router";// 1. Import useLocation

const BookAppointmentForm = () => {

  // 2. Safely extract the doctor object (if the user navigated here from the Find Doctor page)
  const location = useLocation(); 
  const passedDoctor = location.state?.selectedDoctor;

  // 3. Pre-fill the doctorId if we have one!
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
            {/* 4. Optional: Pass the doctor object to FormHeader or FormFields if you want to display their name! */}
            <FormHeader doctor={passedDoctor} /> 
            <FormFields inputData={inputData} setInputData={setInputData} doctor={passedDoctor} />
          </div>
          <FormSummary inputData={inputData} />
        </div>
      </div>
    </>
  );
};

export default BookAppointmentForm;
