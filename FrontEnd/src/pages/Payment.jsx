import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useMemo } from "react";
import { ShieldCheck } from "lucide-react";
import PaymentForm from "../components/PaymentForm";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent } from "@/redux/slices/paymentSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#008484",
    colorBackground: "#ffffff",
    colorText: "#1f2937",
    colorDanger: "#ef4444",
    colorTextPlaceholder: "#9ca3af",
    fontFamily: "Poppins, system-ui, sans-serif",
    borderRadius: "12px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      boxShadow: "none",
      color: "#1f2937",
      padding: "12px 14px",
    },
    ".Input:focus": {
      border: "1px solid #008484",
      boxShadow: "0 0 0 3px rgba(0, 132, 132, 0.15)",
    },
    ".Label": {
      color: "#374151",
      fontSize: "13px",
      fontWeight: "500",
      marginBottom: "6px",
    },
    ".Tab": {
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      color: "#6b7280",
    },
    ".Tab:hover": {
      backgroundColor: "#f3f4f6",
      color: "#1f2937",
    },
    ".Tab--selected": {
      backgroundColor: "#E6F3F3",
      borderColor: "#008484",
      color: "#008484",
    },
    ".Error": {
      color: "#ef4444",
    },
  },
};

function Payment() {
  const { amount, appointmentId, clientSecret, errorMessage, loading } =
    useSelector((state) => state.payment);
  const dispatch = useDispatch();

  useEffect(() => {
    // Log whenever payment state updates so we see the latest dispatched values
    dispatch(
      createPaymentIntent({
        amount: amount * 100,
        appointmentId,
      }),
    );
    // If you need to create a payment intent on the server, do it when amount and appointmentId are available
    // axios
    // 	.post("http://localhost:5000/api/payment/create-intent", {
    // 			amount: amount,
    // 			appointmentId,
    // 		})
    // 	.then((response) => {
    // 		setOptions({
    // 			clientSecret: response.data.clientSecret,
    // 			appearance,
    // 		});
    // 	});
  }, []);

  const options = useMemo(() => {
    return {
      clientSecret,
      appearance,
    };
  }, [clientSecret]);

  useEffect(() => {
    if (errorMessage) {
      console.error("Payment Error:", errorMessage);
    }
  }, [errorMessage]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F4F6F5] px-6 font-body text-sm text-gray-500">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#008484]/20 border-t-[#008484]" />
        <p>Preparing secure checkout…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F6F5] px-4 py-8 font-body sm:px-6">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 rounded-3xl bg-white p-6 shadow-xl shadow-black/5 duration-500 sm:p-9">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6F3F3]">
            <ShieldCheck className="h-7 w-7 text-[#008484]" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#008484]">
            Secure checkout
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Complete your payment
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Your payment is protected by 256-bit SSL encryption
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#E6F3F3] bg-[#E6F3F3]/60 px-5 py-4">
          <span className="text-sm font-medium text-gray-600">Total</span>
          <span className="text-2xl font-bold text-[#008484]">
            {amount} EGP
          </span>
        </div>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
}

export default Payment;
