const Stats = () => {
  const stats = [
    { number: "99", label: "Patient satisfaction", suffix: "%" },
    { number: "15", label: "Active Patients", suffix: "k" },
    { number: "12", label: "Appointments Booked", suffix: "k" },
    { number: "240", label: "Network growth", suffix: "%" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#008484] mb-12">
        Our results in numbers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-4xl md:text-5xl font-bold text-[#008484]">
              {stat.number}
              <span className="text-[#84CC16]">{stat.suffix}</span>
            </p>
            <p className="text-gray-800 font-bold mt-3 text-sm md:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
