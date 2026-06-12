import { useState } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { cancelAppointment } from "../../redux/slices/userAppointmentsSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { setPaymentAppoinmentId } from "@/redux/slices/paymentSlice";
import { useNavigate } from "react-router";

const AppointmentCard = ({ appointment, isLast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancelConfirm = () => {
    dispatch(cancelAppointment(appointment._id))
      .unwrap()
      .then(() => {
        toast.success("Appointment Cancelled Successfully!");
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.success("Unable to Cancel The Appointment," + err);
        console.error("Cancellation failed: ", err);
      });
  };

  const handlePay = () => {
    dispatch(setPaymentAppoinmentId(appointment._id));
    navigate("/payment");
  };

  const appointmentUsername =
    role == "doctor" ? appointment.patient.name : appointment.doctor.name;

  return (
    <div
      className={`grid grid-cols-[2fr_1fr_2fr_1fr_1fr] bg-[#f2f4f5] p-4 ${isLast ? "rounded-b-xl" : ""}`}
    >
      <span className="text-lg text-gray-700">{appointmentUsername}</span>
      <span className="text-lg text-gray-700">
        {format(appointment.date, "yyyy-MM-dd")}
      </span>
      <span className="text-lg text-gray-700">{appointment.timeSlot}</span>
      <span className="text-lg text-gray-700">{appointment.status}</span>

      {appointment.status === "cancelled" ? (
        <div className="bg-gray-300 text-center rounded-sm w-42 flex items-center justify-center select-none">
          <span className="text-center text-gray-600 text-sm font-medium">
            Cancelled
          </span>
        </div>
      ) : (
        <div className="flex gap-2 ">
          <div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-destructive hover:bg-red-500 cursor-pointer"
            >
              Cancel Appointment
            </Button>
          </div>

          {/* PATIENT ONLY: Pay Button */}
          {role === "patient" && appointment.status === "pending" && (
            <div>
              <Button onClick={handlePay} className="cursor-pointer">
                Pay to confirm
              </Button>
            </div>
          )}

          {/* DOCTOR ONLY: Create Medical Record Button */}
          {role === "doctor" && (
            <div>
              <Button
                onClick={() =>
                  navigate("/create-record", {
                    // Securely pass the IDs in the background state!
                    state: {
                      patientId: appointment.patient._id || appointment.patient,
                      appointmentId: appointment._id,
                    },
                  })
                }
                className="bg-[#008484] hover:bg-teal-700 text-white cursor-pointer"
              >
                Create Medical Record
              </Button>
            </div>
          )}

          {/* <div>
            {appointment.status === "pending" ? (
              <Button onClick={handlePay} className="cursor-pointer">
                Pay to confirm
              </Button>
            ) : (
              ""
            )}
          </div> */}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Confirm Cancellation
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel the appointment for{" "}
              <strong>{appointment.patient.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancelConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
