const Services = () => {
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
      image: "/diagonsis.jpg",
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
    <div className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#008484] mb-4">
        Services we provide
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto mb-12">
        Discover a wide range of specialized medical disciplines. Our network of
        verified professionals ensures you receive the highest quality care
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
  );
};

export default Services;
