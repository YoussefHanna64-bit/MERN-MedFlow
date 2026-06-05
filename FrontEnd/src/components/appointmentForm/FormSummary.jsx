import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../../redux/slices/appointmentFormSlice";
import Spinner from "../spinner";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const FormSummary = ({ inputData }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.appointmentForm,
  );

  const handleSubmit = () => {
    if (!inputData.doctorId || !inputData.date || !inputData.timeSlot) {
      alert("Please fill in all required fields.");
      return;
    }
    dispatch(bookAppointment(inputData));
  };

  useEffect(() => {
    if (error) {
      toast.error("Error occurred: " + error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Appointment Booked Successfully, Redirecting to payment");
      ////////////// Navigate to Payment Screen
    }
  }, [success]);
  return (
    <>
      <div className="bg-white p-5 rounded h-full col-span-2 border-l-4 border-primary">
        <div className="flex-col items-center">
          <label
            htmlFor="preferredDateID"
            className="text-gray-600 font-semibold uppercase"
          >
            Summary
          </label>
          <div className="mt-10 flex justify-between items-center">
            <span className="text-gray-700">Consultation Fee</span>
            <span className="text-primary text-2xl font-bold">$125.00</span>
          </div>
          <div className="mt-10 flex justify-between items-center">
            <span className="text-gray-700">Lab Service Deposite</span>
            <span className="text-gray700 font-semibold">$45.00</span>
          </div>
          <div className="mt-10 flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Estimated Total</span>
            <span className="text-gray700 font-semibold text-xl">$170.00</span>
          </div>
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-primary w-80 h-14 text-white text-lg font-semibold rounded-lg cursor-pointer hover:bg-[#006c73] disabled:opacity-50 ${
                !loading ? "px-6 py-3" : ""
              }`}
            >
              {loading ? (
                <Spinner height="h-13" color="border-white" />
              ) : (
                "Book Appointment"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSummary;
