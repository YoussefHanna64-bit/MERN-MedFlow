export const Icon = ({ path }) => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={path}
    />
  </svg>
);

export const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
      {label}
    </label>
    {children}
  </div>
);

export const SectionHeading = ({ children }) => (
  <div className="flex items-center gap-3 mt-2">
    <span className="text-xs font-bold text-primary uppercase tracking-widest">
      {children}
    </span>
    <div className="flex-1 h-px bg-primary/20" />
  </div>
);

export const Input = ({ icon, ...props }) => (
  <div className="relative">
    {icon && (
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
        {icon}
      </span>
    )}
    <input
      {...props}
      className={`w-full bg-white border-2 border-gray-200 rounded-xl py-3 pr-4 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-primary transition-colors ${icon ? "pl-10" : "pl-4"}`}
    />
  </div>
);

export const Select = ({ icon, options, placeholder, ...props }) => (
  <div className="relative">
    {icon && (
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none z-10">
        {icon}
      </span>
    )}
    <select
      {...props}
      className={`w-full bg-white border-2 border-gray-200 rounded-xl py-3 pr-8 text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer ${icon ? "pl-10" : "pl-4"} ${!props.value ? "text-gray-400" : "text-gray-800"}`}
    >
      <option value="">{placeholder || "Select..."}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      <Icon path="M19 9l-7 7-7-7" />
    </span>
  </div>
);

export const Textarea = ({ icon, ...props }) => (
  <div className="relative">
    {icon && (
      <span className="absolute left-3.5 top-3.5 text-primary pointer-events-none">
        {icon}
      </span>
    )}
    <textarea
      {...props}
      rows={3}
      className={`w-full bg-white border-2 border-gray-200 rounded-xl py-3 pr-4 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-primary transition-colors resize-none ${icon ? "pl-10" : "pl-4"}`}
    />
  </div>
);

export const RemoveButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-red-50 border-2 border-red-100 text-red-400 hover:bg-red-100 transition-colors"
  >
    <Icon path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </button>
);

export const AddButton = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="self-start flex items-center gap-1.5 text-xs text-primary hover:text-[#005f65] font-semibold border border-primary/30 hover:border-primary rounded-full px-3 py-1.5 transition-colors"
  >
    <Icon path="M12 4v16m8-8H4" />
    {children}
  </button>
);
