import {
  ArrowRight,
  CalendarCheck2,
  DollarSign,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Link } from "react-router";
import AuthGreenPanel from "../components/authComponents/AuthGreenPanel";
import InputField from "../components/authComponents/InputField";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../redux/slices/authSlice";
import { createDoctorAuthModel } from "../models/authModels";

const DoctorSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpState, setSignUpState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    specialization: "",
    addresses: "",
    fees: "",
    description: "",
  });

  const handleChange = (e) => {
    setSignUpState({ ...signUpState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signUpState.name.trim().length < 3) {
      //toast
      return;
    }

    if (signUpState.password.length < 8) {
      //toast
      return;
    }

    if (signUpState.password !== signUpState.confirmPassword) {
      //toast
      return;
    }

    const doctorPayload = createDoctorAuthModel(signUpState);
    const res = await dispatch(register(doctorPayload));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/home");

      setSignUpState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        specialization: "",
        addresses: "",
        fees: "",
        description: "",
      });
      
    } else {
      //toast
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 font-body text-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[90vh] max-w-6xl items-center gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <AuthGreenPanel
          title="Doctor registration"
          description="Create your doctor account and start managing your clinic flow."
          items={[
            {
              icon: CalendarCheck2,
              title: "Manage appointments",
              description: "See daily bookings clearly and stay organized.",
            },
            {
              icon: ShieldCheck,
              title: "Secure profile",
              description: "Keep your professional account protected.",
            },
            {
              icon: Stethoscope,
              title: "Professional onboarding",
              description:
                "Add specialization, locations, and consultation fees.",
            },
          ]}
        />

        <section className="rounded-3xl bg-white p-6 shadow-xl shadow-black/5 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Doctor Signup
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Create doctor account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Fill in your details and start managing your clinic.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Name"
              icon={UserRound}
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />

            <InputField
              label="Email address"
              icon={Mail}
              type="email"
              name="email"
              placeholder="email@example.com"
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              icon={Lock}
              type="password"
              name="password"
              placeholder="Create a secure password"
              onChange={handleChange}
              required
            />

            <InputField
              label="Confirm Password"
              icon={Lock}
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleChange}
              required
            />

            <InputField
              label="Phone"
              icon={Phone}
              type="tel"
              name="phone"
              placeholder="01xxxxxxxxx"
              onChange={handleChange}
              required
            />
            <InputField
              label="Specialization"
              icon={Stethoscope}
              type="text"
              name="specialization"
              placeholder="Cardiology"
              onChange={handleChange}
              required
            />

            <InputField
              label="Addresses"
              icon={MapPin}
              type="text"
              name="addresses"
              placeholder="Smoha, Alexandria - Heliopolis, Cairo"
              onChange={handleChange}
              required
            />

            <InputField
              label="Fees"
              icon={DollarSign}
              type="number"
              name="fees"
              placeholder="500"
              onChange={handleChange}
              required
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                rows="4"
                placeholder="Short clinic or professional description"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Create doctor account
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <Link
            to="/signup"
            className="mt-4 flex w-full items-center justify-center rounded-2xl border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Register as patient
          </Link>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="font-semibold text-primary transition hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default DoctorSignUp;
