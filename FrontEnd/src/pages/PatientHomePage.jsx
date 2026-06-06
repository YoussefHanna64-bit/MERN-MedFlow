import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import FindDoctor from "../components/homeComponents/FindDoctor";
import MeetOurTeam from "../components/homeComponents/MeetOurTeam";
import Services from "../components/homeComponents/Services";
import Stats from "../components/homeComponents/Stats";
import { fetchDoctors } from "../redux/slices/doctorSlice";

const PatientHomePage = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.doctor.doctors);
  const isLoading = useSelector((state) => state.doctor.loading);
  const error = useSelector((state) => state.doctor.error);

  useEffect(() => {
    dispatch(fetchDoctors({ limit: 6 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#F4F6F5] font-body relative overflow-hidden pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome back, <span className="text-[#008484]">{user?.name}</span>
        </h1>
      </div>

      <FindDoctor />

      <MeetOurTeam doctors={doctors} isLoading={isLoading} error={error} />

      <Services />

      <Stats />
    </div>
  );
};

export default PatientHomePage;
