import {
  ArrowRight,
  CalendarDays,
  HeartPulse,
  Lock,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import AuthGreenPanel from "../components/authComponents/AuthGreenPanel";
import InputField from "../components/authComponents/InputField";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../redux/slices/authSlice";
import { createPatientAuthModel } from "../models/authModels";
import toast from "react-hot-toast";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpState, setSignUpState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    bloodType: "",
    dateOfBirth: "",
    gender: "",
    emergencyContact: "",
  });

  const handleChange = (e) => {
    setSignUpState({ ...signUpState, [e.target.name]: e.target.value });
  };

  const emailRegx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneRegx = /^01[0125][0-9]{8}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signUpState.name.trim().length < 3) {
      toast.error("Name must be at least 3 chars");
      return;
    }

    if (signUpState.password.length < 8) {
      toast.error("Password must be at least 8 chars");
      return;
    }

    if (!emailRegx.test(signUpState.email)) {
      toast.error("Please provide a valid email");
      return;
    }

    if (!phoneRegx.test(signUpState.phone)) {
      toast.error("Please provide a valid phone number");
      return;
    }

    if (!phoneRegx.test(signUpState.emergencyContact)) {
      toast.error("Please provide a valid emergency contact phone number");
      return;
    }

    if (!passwordRegex.test(signUpState.password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
      );
      return;
    }

    if (signUpState.password !== signUpState.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const patientPayload = createPatientAuthModel(signUpState);
    const res = await dispatch(register(patientPayload));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Welcome to MedFlow!");

      const role = res.payload.user.role;

      if (role === "patient") {
        navigate("/patient-home");
      } else if (role === "doctor") {
        navigate("/doctor-appointments");
      }

      setSignUpState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        bloodType: "",
        dateOfBirth: "",
        gender: "",
        emergencyContact: "",
      });
    } else {
      toast.error("Failed to create account, please try again");
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 font-body text-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[90vh] max-w-6xl items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-3xl bg-white p-6 shadow-xl shadow-black/5 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Patient Signup
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Create patient account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Fill in your details and start booking appointments.
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
              label="Date of birth"
              icon={CalendarDays}
              type="date"
              name="dateOfBirth"
              onChange={handleChange}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-primary focus-within:bg-white">
                <select
                  name="gender"
                  onChange={handleChange}
                  className="w-full cursor-pointer bg-transparent text-sm outline-none text-gray-800"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <InputField
              label="Emergency contact"
              icon={Phone}
              type="tel"
              name="emergencyContact"
              placeholder="Emergency contact phone"
              onChange={handleChange}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Blood type
              </label>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-primary focus-within:bg-white">
                <select
                  name="bloodType"
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm outline-none text-gray-800 cursor-pointer"
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Create patient account
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* <Link
            to="/signup/doctor"
            className="mt-4 flex w-full items-center justify-center rounded-2xl border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Join us as doctor
          </Link> */}

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

        <AuthGreenPanel
          title="Patient registration"
          description="Fill in your details and start booking appointments."
          items={[
            {
              icon: HeartPulse,
              title: "Track your care",
              description: "Keep your health information in one place.",
            },
            {
              icon: ArrowRight,
              title: "Quick setup",
              description: "Create your account in less than a minute.",
            },
            {
              icon: UserRound,
              title: "Choose your doctor",
              description:
                "Browse and select from our network of trusted healthcare professionals.",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SignUp;
