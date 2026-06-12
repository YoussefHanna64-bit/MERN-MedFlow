import { useState } from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment } from "../../redux/slices/userAppointmentsSlice";
import toast from "react-hot-toast";
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
        toast.error("Unable to Cancel The Appointment: " + err);
        console.error("Cancellation failed: ", err);
      });
  };

  const handlePay = () => {
    dispatch(setPaymentAppoinmentId(appointment._id));
    navigate("/payment");
  };

  const appointmentUsername =
    role === "doctor" ? appointment.patient.name : appointment.doctor.name;

  return (
    <div
      className={`grid grid-cols-[2fr_1fr_2fr_1fr_1fr] bg-[#f2f4f5]/60 p-4 ${
        isLast ? "rounded-b-xl" : ""
      }`}
    >
      <span className="text-lg text-gray-700">{appointmentUsername}</span>
      <span className="text-lg text-gray-700">
        {format(new Date(appointment.date), "yyyy-MM-dd")}
      </span>
      <span className="text-lg text-gray-700">{appointment.timeSlot}</span>
      <span className="text-lg text-gray-700 capitalize">
        {appointment.status}
      </span>

      {appointment.status === "cancelled" ? (
        <div className="bg-gray-300 text-center rounded-sm w-42 flex items-center justify-center select-none">
          <span className="text-center text-gray-600 text-sm font-medium">
            Cancelled
          </span>
        </div>
      ) : (
        <div className="flex gap-2 justify-center">
          {/* Cancel Button (Friend's UI - For Everyone) */}
          <div className="relative group">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-transparent cursor-pointer p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-red-600 group-hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Cancel Appointment
            </span>
          </div>

          {/* Pay Button (Friend's UI - Patient Only) */}
          {role === "patient" && appointment.status === "pending" && (
            <div className="relative group">
              <Button
                onClick={handlePay}
                className="bg-transparent p-2 rounded-full hover:bg-primary transition-colors duration-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-primary group-hover:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
              </Button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Pay to Confirm
              </span>
            </div>
          )}

          {/* Create Record Button (Your Feature + Friend's UI pattern - Doctor Only) */}
          {role === "doctor" && (
            <div className="relative group">
              <Button
                onClick={() =>
                  navigate("/create-record", {
                    state: {
                      patientId: appointment.patient._id || appointment.patient,
                      appointmentId: appointment._id,
                    },
                  })
                }
                className="bg-transparent p-2 rounded-full hover:bg-[#008484] transition-colors duration-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-[#008484] group-hover:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </Button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Create Record
              </span>
            </div>
          )}
        </div>
      )}

      {/* Modal remains unchanged */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Confirm Cancellation
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel the appointment for{" "}
              <strong>{appointmentUsername}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancelConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
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
