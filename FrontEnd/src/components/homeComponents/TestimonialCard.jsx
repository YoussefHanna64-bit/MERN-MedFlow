const TestimonialCard = ({ img, title, rev, name, role }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col h-full">
    <img
      src={img}
      alt={name}
      className="w-16 h-16 rounded-full object-cover mb-6"
    />
    <h4 className="text-xl font-bold text-gray-900 mb-3">"{title}"</h4>
    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
      {rev}
    </p>
    <div>
      <p className="font-bold text-[#008484]">{name}</p>
      <p className="text-xs text-gray-400 mt-1">{role}</p>
    </div>
  </div>
);

export default TestimonialCard;
