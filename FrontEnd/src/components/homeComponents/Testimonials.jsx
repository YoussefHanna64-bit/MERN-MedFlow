import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const reviews = [
    {
      img: "female-patient.png",
      title: "Seamless booking!",
      rev: "Finding a specialist and booking my appointment took less than five minutes. The platform is incredibly intuitive and having my digital records in one place gives me such peace of mind.",
      name: "Sarah Ahmed",
      role: "Verified Patient",
    },
    {
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop",
      title: "Transformed my clinic.",
      rev: "MedFlow has completely streamlined how I manage my daily appointments and patient prescriptions. It is an absolutely indispensable tool for any modern medical practice.",
      name: "Dr. Khaled Youssef",
      role: "Cardiologist",
    },
    {
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
      title: "The best healthcare app.",
      rev: "I used to dread calling clinics to find available times. Now I can see my doctor's real-time schedule, book instantly, and even get my prescriptions sent straight to my phone.",
      name: "Mona Hassan",
      role: "Verified Patient",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#008484] mb-4">
        What our users say
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto mb-16">
        Hear from the patients who have found their specialists, and the doctors
        who have streamlined their clinics.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-24">
        {reviews.map((rev, i) => (
          <TestimonialCard key={i} {...rev} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
