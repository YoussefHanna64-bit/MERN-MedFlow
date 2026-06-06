const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-24 lg:pt-32 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Providing Quality <span className="text-[#008484]">Healthcare</span>
          For A <br className="hidden md:block" />
          <span className="text-[#84CC16]">Brighter</span> And
          <span className="text-[#84CC16]">Healthy</span> Future
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed">
          At Our Hospital, We Are Dedicated To Providing Exceptional Medical
          Care To Our Patients And Their Families. Our Experienced Team Of
          Medical Professionals, Cutting-Edge Technology, And Compassionate
          Approach Make Us A Leader In The Healthcare Industry.
        </p>
      </div>

      <div className="relative flex justify-center items-center mt-12 lg:mt-0">
        <div className="relative z-10 w-full max-w-[450px] md:max-w-[500px]">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop"
            alt="Professional Doctor"
            className="w-full h-[500px] md:h-[600px] object-cover rounded-[3rem] shadow-2xl border-8 border-white/50"
          />

          <div className="absolute top-10 -right-4 md:-right-8 bg-white px-6 py-3 rounded-full shadow-lg z-20 flex items-center gap-2 font-bold text-gray-800">
            <span className="text-[#008484] text-xl">24/7</span> Service
          </div>

          <div className="absolute bottom-10 -left-4 md:-left-8 bg-white p-3 rounded-2xl shadow-lg z-20 flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-800">
              Our Professionals
            </span>
            <div className="flex items-center">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white -ml-3 first:ml-0 overflow-hidden"
                >
                  <img src={`https://i.pravatar.cc/100?img=${num}`} />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-[#008484] border-2 border-white -ml-3 flex items-center justify-center text-[10px] text-white font-bold">
                30+
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
