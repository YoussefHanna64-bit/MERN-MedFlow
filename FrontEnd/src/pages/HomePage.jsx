import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../redux/thunks/doctor/fetchDoctors";
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const doctors = useSelector((state) => state.doctor.doctors);
  const isLoading = useSelector((state) => state.doctor.loading);
  const error = useSelector((state) => state.doctor.error);

  useEffect(() => {
    dispatch(fetchDoctors({ limit: 6 }));
  }, [dispatch]);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=300&auto=format&fit=crop",
  ];

  const services = [
    {
      title: "Dental treatments",
      description:
        "Find top-rated dentists for comprehensive care, from routine checkups and cleanings to advanced restorative procedures and orthodontics.",
      image: "/Dental.jpg",
    },
    {
      title: "Bones treatments",
      description:
        "Connect with expert orthopedic specialists to manage fractures, joint pain, sports injuries, and physical rehabilitation tailored to you.",
      image: "/bones.jpg",
    },
    {
      title: "Diagnosis",
      description:
        "Book appointments with certified diagnostic centers and laboratories for accurate, fast, and reliable medical imaging and testing.",
      image: "/diagonsis.jpg", // Using your exact filename!
    },
    {
      title: "Cardiology",
      description:
        "Access state-of-the-art heart care professionals for preventive cardiovascular screenings, personalized treatments, and ongoing monitoring.",
      image: "/cardiology.jpg",
    },
    {
      title: "Surgery",
      description:
        "Consult with highly skilled general and specialized surgeons for minimally invasive procedures and comprehensive pre-op and post-op care.",
      image: "/surgery.jpg",
    },
    {
      title: "Eye care",
      description:
        "Schedule complete vision exams, corrective care, and specialized ophthalmology treatments to maintain optimal eye health.",
      image: "/eye.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F5] font-body relative overflow-hidden pb-20">
      {/* ----------------- HERO SECTION ----------------- */}
      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-24 lg:pt-32 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Providing Quality <span className="text-[#008484]">Healthcare</span>{" "}
            For A <br className="hidden md:block" />
            <span className="text-[#84CC16]">Brighter</span> And{" "}
            <span className="text-[#84CC16]">Healthy</span> Future
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed">
            At Our Hospital, We Are Dedicated To Providing Exceptional Medical
            Care To Our Patients And Their Families. Our Experienced Team Of
            Medical Professionals, Cutting-Edge Technology, And Compassionate
            Approach Make Us A Leader In The Healthcare Industry.
          </p>
        </div>

        {/* Right Column: Image & Badges */}
        <div className="relative flex justify-center items-center mt-12 lg:mt-0">
          {/* Premium Hero Image with Built-in Clinic Background */}
          <div className="relative z-10 w-full max-w-[450px] md:max-w-[500px]">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop"
              alt="Professional Doctor"
              className="w-full h-[500px] md:h-[600px] object-cover rounded-[3rem] shadow-2xl border-8 border-white/50"
            />

            {/* Floating Badge 1: 24/7 Service */}
            <div className="absolute top-10 -right-4 md:-right-8 bg-white px-6 py-3 rounded-full shadow-lg z-20 flex items-center gap-2 font-bold text-gray-800">
              <span className="text-[#008484] text-xl">24/7</span> Service
            </div>

            {/* Floating Badge 2: Our Professionals */}
            <div className="absolute bottom-10 -left-4 md:-left-8 bg-white p-3 rounded-2xl shadow-lg z-20 flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-800">
                Our Professionals
              </span>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white -ml-0 overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=1" alt="doc" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white -ml-3 overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=2" alt="doc" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white -ml-3 overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=3" alt="doc" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#008484] border-2 border-white -ml-3 flex items-center justify-center text-[10px] text-white font-bold">
                  30+
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- FIND A DOCTOR COMPONENT ----------------- */}
      <div className="max-w-4xl mx-auto px-6 relative z-20 -mt-8 pb-12">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Find A Doctor
            </h2>
            <p className="text-gray-500 text-sm">
              Discover and book appointments with our top specialists.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={() => {
                // Fetch and parse the exact key your Redux slice uses
                const storedAuth = JSON.parse(localStorage.getItem("userAuth"));

                // Check if the object exists and has a token inside it
                if (storedAuth && storedAuth.token) {
                  navigate("/find-doctor");
                } else {
                  navigate("/signup");
                }
              }}
              className="bg-[#008484] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex-1 md:flex-none text-center shadow-md"
            >
              Find a Doctor
            </button>
            <button
              onClick={() => {}}
              className="bg-[#E6F3F3] text-[#008484] px-8 py-3.5 rounded-lg font-semibold hover:bg-[#d0ecec] transition-colors flex-1 md:flex-none text-center"
            >
              Appointments
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- STATS IN NUMBERS ----------------- */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#008484] mb-12">
          Our results in numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-[#008484]">
              99<span className="text-[#84CC16]">%</span>
            </p>
            <p className="text-gray-800 font-bold mt-3 text-sm md:text-base">
              Patient satisfaction
            </p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-[#008484]">
              15<span className="text-[#84CC16]">k</span>
            </p>
            <p className="text-gray-800 font-bold mt-3 text-sm md:text-base">
              Active Patients
            </p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-[#008484]">
              12<span className="text-[#84CC16]">k</span>
            </p>
            <p className="text-gray-800 font-bold mt-3 text-sm md:text-base">
              Appointments Booked
            </p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-[#008484]">
              240<span className="text-[#84CC16]">%</span>
            </p>
            <p className="text-gray-800 font-bold mt-3 text-sm md:text-base">
              Network growth
            </p>
          </div>
        </div>
      </div>

      {/* ----------------- REASONS TO CHOOSE US ----------------- */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#008484] leading-tight">
            You have lots of reasons <br className="hidden lg:block" /> to
            choose us
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base max-w-lg">
            MedFlow modernizes your healthcare experience. Whether you're a
            patient looking for top-tier specialists or a doctor streamlining
            your daily clinic flow, our platform provides secure medical
            records, instant booking, and effortless communication all in one
            place.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#008484] text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors shadow-md"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-[#008484] border-2 border-[#E6F3F3] px-8 py-3 rounded-full font-semibold hover:bg-[#E6F3F3] hover:border-[#008484] transition-all"
            >
              Log In
            </button>
          </div>
        </div>

        <div className="relative">
          <img
            src="/operation.jpg"
            alt="Modern Medical Care"
            className="w-full h-[350px] md:h-[450px] object-cover rounded-[2rem] shadow-xl"
          />
        </div>
      </div>

      {/* ----------------- SERVICES WE PROVIDE ----------------- */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#008484] mb-4">
          Services we provide
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          Discover a wide range of specialized medical disciplines. Our network
          of verified professionals ensures you receive the highest quality care
          tailored to your specific needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-md cursor-default"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-2xl mb-5"
              />
              <h3 className="text-xl font-bold text-[#008484] mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 text-center bg-[#EAEAEA] rounded-[3rem] my-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#008484] mb-4">
          Meet our team members
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          Our dedicated specialists combine years of clinical expertise with a
          compassionate approach to patient care.
        </p>

        {isLoading ? (
          <p className="text-[#008484] font-semibold animate-pulse">
            Loading amazing doctors...
          </p>
        ) : error ? (
          <p className="text-gray-500">{error}</p>
        ) : doctors.length === 0 ? (
          <p className="text-gray-500">No doctors available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doc, index) => (
              <div
                key={doc._id || index}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-xl"
              >
                <img
                  src={
                    doc.image &&
                    typeof doc.image === "string" &&
                    doc.image.trim().length > 5 &&
                    doc.image !== "null"
                      ? doc.image
                      : fallbackImages[index % fallbackImages.length]
                  }
                  onError={(e) => {
                    e.target.onerror = null; // Prevents infinite looping
                    e.target.src =
                      fallbackImages[index % fallbackImages.length];
                  }}
                  alt={doc.user?.name || "Doctor"}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#E6F3F3] shadow-sm"
                />

                {/* Doctor Name & Specialization */}
                <h3 className="text-2xl font-bold text-[#008484] mb-1">
                  {doc.user?.name || "Unknown Doctor"}
                </h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                  {doc.specialization || "Medical Specialist"}
                </p>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {doc.description ||
                    "Dedicated medical professional providing excellent patient care and specializing in advanced treatments."}
                </p>

                {/* Social Icons (using simple light blue SVGs to match design) */}
                <div className="flex gap-3 mt-auto">
                  {/* Facebook */}
                  <div className="w-8 h-8 rounded bg-[#E6F3F3] flex items-center justify-center text-[#008484] hover:bg-[#008484] hover:text-white transition-colors cursor-pointer">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  {/* Twitter */}
                  <div className="w-8 h-8 rounded bg-[#E6F3F3] flex items-center justify-center text-[#008484] hover:bg-[#008484] hover:text-white transition-colors cursor-pointer">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </div>
                  {/* Instagram */}
                  <div className="w-8 h-8 rounded bg-[#E6F3F3] flex items-center justify-center text-[#008484] hover:bg-[#008484] hover:text-white transition-colors cursor-pointer">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  {/* LinkedIn */}
                  <div className="w-8 h-8 rounded bg-[#E6F3F3] flex items-center justify-center text-[#008484] hover:bg-[#008484] hover:text-white transition-colors cursor-pointer">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ----------------- TESTIMONIALS ----------------- */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#008484] mb-4">
          What our users say
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16">
          Hear from the patients who have found their specialists, and the
          doctors who have streamlined their clinics using MedFlow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-24">
          {/* Testimonial 1: Patient */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col h-full">
            <img
              src="female-patient.png"
              alt="Patient"
              className="w-16 h-16 rounded-full object-cover mb-6"
            />
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              "Seamless booking!"
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
              Finding a specialist and booking my appointment took less than
              five minutes. The platform is incredibly intuitive and having my
              digital records in one place gives me such peace of mind.
            </p>
            <div>
              <p className="font-bold text-[#008484]">Sarah Ahmed</p>
              <p className="text-xs text-gray-400 mt-1">Verified Patient</p>
            </div>
          </div>

          {/* Testimonial 2: Doctor */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col h-full">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop"
              alt="Doctor"
              className="w-16 h-16 rounded-full object-cover mb-6"
            />
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              "Transformed my clinic."
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
              MedFlow has completely streamlined how I manage my daily
              appointments and patient prescriptions. It is an absolutely
              indispensable tool for any modern medical practice.
            </p>
            <div>
              <p className="font-bold text-[#008484]">Dr. Khaled Youssef</p>
              <p className="text-xs text-gray-400 mt-1">Cardiologist</p>
            </div>
          </div>

          {/* Testimonial 3: Patient */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col h-full">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
              alt="Patient"
              className="w-16 h-16 rounded-full object-cover mb-6"
            />
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              "The best healthcare app."
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
              I used to dread calling clinics to find available times. Now I can
              see my doctor's real-time schedule, book instantly, and even get
              my prescriptions sent straight to my phone.
            </p>
            <div>
              <p className="font-bold text-[#008484]">Mona Hassan</p>
              <p className="text-xs text-gray-400 mt-1">Verified Patient</p>
            </div>
          </div>
        </div>

        {/* ----------------- TRUSTED BY LOGOS ----------------- */}
        <div className="border-t border-gray-200 pt-16">
          <h3 className="text-2xl font-bold text-[#008484] mb-10">
            Trusted by top clinics and medical centers
          </h3>

          {/* Faux Logos using styled text */}
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-black text-gray-800 tracking-tighter">
              Care<span className="text-[#008484]">Point</span>
            </span>
            <span className="text-2xl font-bold text-gray-800 uppercase tracking-widest">
              Medi<span className="font-light">Life</span>
            </span>
            <span className="text-2xl font-serif italic text-gray-800">
              HealthPlus+
            </span>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
              Apex<span className="text-[#84CC16]">Clinic</span>
            </span>
            <span className="text-xl font-black text-gray-800 uppercase border-2 border-gray-800 p-1">
              WELLNESS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
