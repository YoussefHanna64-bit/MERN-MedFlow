import FormFields from "../components/appointmentForm/FormFields";
import FormHeader from "../components/appointmentForm/FormHeader";
import FormSummary from "../components/appointmentForm/FormSummary";
import appointImg from "../assets/appointImg.svg";
import { useState } from "react";

const BookAppointmentForm = () => {
  const [inputData, setInputData] = useState({
    doctorId: "",
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
            <FormFields inputData={inputData} setInputData={setInputData} />
          </div>
          <FormSummary inputData={inputData} />
        </div>
      </div>
    </>
  );
};

export default BookAppointmentForm;
