import { useNavigate } from "react-router";

const WhyChooseUs = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#008484] leading-tight">
          You have lots of reasons <br className="hidden lg:block" /> to choose
          us
        </h2>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base max-w-lg">
          MedFlow modernizes your healthcare experience. Whether you're a
          patient looking for top-tier specialists or a doctor streamlining your
          daily clinic flow...
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
  );
};

export default WhyChooseUs;
