import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const HomeDoctorCard = ({ doc, fallbackImage }) => {
  const socialIcons = [
    { Icon: FaFacebookF, name: "facebook" },
    { Icon: FaXTwitter, name: "twitter" },
    { Icon: FaInstagram, name: "instagram" },
    { Icon: FaLinkedinIn, name: "linkedin" },
  ];

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-xl">
      <img
        src={
          doc.image && typeof doc.image === "string" && doc.image.length > 5
            ? doc.image
            : fallbackImage
        }
        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#E6F3F3] shadow-sm"
      />

      <h3 className="text-2xl font-bold text-[#008484] mb-1">
        {doc.user?.name || "Unknown Doctor"}
      </h3>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
        {doc.specialization || "Medical Specialist"}
      </p>

      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
        {doc.description ||
          "Dedicated medical professional providing excellent care."}
      </p>

      <div className="flex gap-3 mt-auto">
        {socialIcons.map(({ Icon, name }) => (
          <div
            key={name}
            className="w-8 h-8 rounded bg-[#E6F3F3] flex items-center justify-center text-[#008484] hover:bg-[#008484] hover:text-white transition-colors cursor-pointer"
          >
            <Icon size={16} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDoctorCard;
