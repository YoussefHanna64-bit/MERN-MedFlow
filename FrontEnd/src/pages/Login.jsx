import {
  ArrowRight,
  CalendarCheck2,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import AuthGreenPanel from "../components/authComponents/AuthGreenPanel";
import InputField from "../components/authComponents/InputField";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(login(loginState));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Welcome back to MedFlow!");

      const role = res.payload.user.role;

      if (role === "patient") {
        navigate("/patient-home");
      } else if (role === "doctor") {
        navigate("/doctor-appointments");
      }

      setLoginState({
        email: "",
        password: "",
      });
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 font-body text-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[90vh] max-w-6xl items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <AuthGreenPanel
          title="Welcome to MedFlow"
          description="Login to manage appointments, patients, and schedules in one place."
          items={[
            {
              icon: CalendarCheck2,
              title: "Daily appointments",
              description: "See your visits and plan your day faster.",
            },
            {
              icon: ShieldCheck,
              title: "Secure access",
              description: "Your account stays protected and private.",
            },
            {
              icon: UserRound,
              title: "Doctor and patient portals",
              description: "One app experience for every user.",
            },
          ]}
        />

        <section className="rounded-3xl bg-white p-6 shadow-xl shadow-black/5 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Welcome back
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Login to MedFlow
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Use your account details to continue managing appointments and
              records.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?
            <Link
              to="/signup"
              className="font-semibold text-primary transition hover:text-primary/80"
            >
              Create one
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
