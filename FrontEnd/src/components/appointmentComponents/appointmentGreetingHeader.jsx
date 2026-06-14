import { useEffect } from "react";
import { useSelector } from "react-redux";

const AppointmentGreetingHeader = () => {
  const { role, user } = useSelector((state) => state.auth);

  useEffect(() => {
  }, [role, user]);

  const greetingText = role === "doctor" ? "Good Morning" : "Welcome Back";

  const nameText = role === "doctor" ? `Dr. ${user.name}` : user.name;

  return (
    <div className="mb-3">
      <span className="text-xl mr-2 text-gray-800 font-semibold">
        {greetingText}
      </span>

      <span className="text-2xl text-primary font-bold">{nameText}</span>
    </div>
  );
};

export default AppointmentGreetingHeader;
