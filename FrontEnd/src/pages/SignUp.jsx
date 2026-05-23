import {
  ArrowRight,
  HeartPulse,
  Lock,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { Link } from "react-router";
import AuthGreenPanel from "../components/authComponents/AuthGreenPanel";
import InputField from "../components/authComponents/InputField";

const SignUp = () => {
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

          <form className="space-y-4">
            <InputField
              label="Name"
              icon={UserRound}
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />

            <InputField
              label="Email address"
              icon={Mail}
              type="email"
              name="email"
              placeholder="email@example.com"
              required
            />

            <InputField
              label="Password"
              icon={Lock}
              type="password"
              name="password"
              placeholder="Create a secure password"
              required
            />

            <InputField
              label="Confirm Password"
              icon={Lock}
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
            />

            <InputField
              label="Phone"
              icon={Phone}
              type="tel"
              name="phone"
              placeholder="01xxxxxxxxx"
              required
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Blood type
              </label>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-primary focus-within:bg-white">
                <select
                  name="bloodType"
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

            <input type="hidden" name="role" value="patient" />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Create patient account
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <Link
            to="/signup/doctor"
            className="mt-4 flex w-full items-center justify-center rounded-2xl border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Join us as doctor
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
