const TrustedCenters = () => {
  return (
    <div className="border-t border-gray-200 pt-16">
      <h3 className="text-2xl font-bold text-[#008484] mb-10 text-center">
        Trusted by top clinics and medical centers
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 pb-16">
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
  );
};

export default TrustedCenters;
