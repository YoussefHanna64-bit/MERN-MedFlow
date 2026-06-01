const InputField = ({ label, icon: Icon, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-primary focus-within:bg-white">
        <Icon className="h-5 w-5 text-primary" />
        <input
          {...props}
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default InputField;
