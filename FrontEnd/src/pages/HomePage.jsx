import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../redux/slices/doctorSlice";
import Testimonials from "../components/homeComponents/Testimonials";
import TrustedCenters from "../components/homeComponents/TrustedCenters";
import MeetOurTeam from "../components/homeComponents/MeetOurTeam";
import Services from "../components/homeComponents/Services";
import Hero from "../components/homeComponents/Hero";
import Stats from "../components/homeComponents/Stats";
import WhyChooseUs from "../components/homeComponents/WhyChooseUs";
import FindDoctor from "../components/homeComponents/FindDoctor";

const HomePage = () => {
  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.doctor.doctors);
  const isLoading = useSelector((state) => state.doctor.loading);
  const error = useSelector((state) => state.doctor.error);

  useEffect(() => {
    dispatch(fetchDoctors({ limit: 6 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#F4F6F5] font-body relative overflow-hidden pb-20">
      <Hero />
      <FindDoctor />
      <Stats />
      <WhyChooseUs />
      <Services />

      <MeetOurTeam doctors={doctors} isLoading={isLoading} error={error} />

      <Testimonials />
      <TrustedCenters />
    </div>
  );
};

export default HomePage;
