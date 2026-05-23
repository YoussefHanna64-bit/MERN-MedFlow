import FormFields from "../components/appointmentForm/FormFields";
import FormHeader from "../components/appointmentForm/FormHeader";
import FormSummary from "../components/appointmentForm/FormSummary";


const BookAppointmentForm = () => {
  return (
    <>
      <div className="bg-background min-h-screen p-16 font-body">
        <div className="grid grid-cols-8 gap-6">
          <div className="bg-white p-5 rounded-lg col-span-6">
            <FormHeader />
            <FormFields />
          </div>
          <FormSummary />
        </div>
      </div>
    </>
  );
};

export default BookAppointmentForm;
