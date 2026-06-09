import {
  ArrowRight,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import AuthGreenPanel from "../components/authComponents/AuthGreenPanel";
import InputField from "../components/authComponents/InputField";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../redux/slices/authSlice";
import { createAdminAuthModel } from "../models/authModels";
import toast from "react-hot-toast";

const AdminSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpState, setSignUpState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
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

    const adminPayload = createAdminAuthModel(signUpState);
    const res = await dispatch(register(adminPayload));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Welcome to MedFlow Admin!");
      navigate("/admin-dashboard");
      setSignUpState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
    } else {
      toast.error("Failed to create account, please try again");
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 font-body text-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[90vh] max-w-6xl items-center gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <AuthGreenPanel
          title="Admin registration"
          description="Create your admin account and manage MedFlow operations securely."
          items={[
            {
              icon: ShieldCheck,
              title: "Secure access",
              description:
                "Admin accounts have elevated permissions and secure access control.",
            },
            {
              icon: ArrowRight,
              title: "Fast setup",
              description:
                "Create admin accounts quickly with role-specific details.",
            },
            {
              icon: UserRound,
              title: "Team management",
              description:
                "Monitor users, doctors, and platform activity from one dashboard.",
            },
          ]}
        />

        <section className="rounded-3xl bg-white p-6 shadow-xl shadow-black/5 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Admin Signup
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Create admin account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Provide your credentials and admin details to manage the platform.
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

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Create admin account
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminSignUp;
