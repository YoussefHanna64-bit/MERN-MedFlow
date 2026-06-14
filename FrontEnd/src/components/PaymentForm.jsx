import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateAppointment } from "@/redux/slices/userAppointmentsSlice";
import { useNavigate } from "react-router";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const appointmentId = useSelector((state) => state.payment.appointmentId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/patient-home",
      },
      redirect: "if_required",
    });

    setIsLoading(false);

    if (result.error) {
      setMessage(result.error.message);
      setIsSuccess(false);
    } else if (
      result.paymentIntent &&
      result.paymentIntent.status === "succeeded"
    ) {
      dispatch(
        updateAppointment({
          id: appointmentId,
          status: "confirmed",
          paymentStatus: "paid",
        }),
      );
      setIsSuccess(true);
      setMessage("Payment successful! Thank you for your purchase.");
      setTimeout(() => {
        navigate("/patient-home");
      }, 2000);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <PaymentElement />

      {message && (
        <div
          className={`animate-in fade-in slide-in-from-top-1 rounded-xl px-4 py-3 text-sm font-medium duration-300 ${
            isSuccess
              ? "border border-green-200 bg-green-50 text-green-700"
              : "border border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <button
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!stripe || isLoading}
        type="submit"
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay Now
          </>
        )}
      </button>
    </form>
  );
}
