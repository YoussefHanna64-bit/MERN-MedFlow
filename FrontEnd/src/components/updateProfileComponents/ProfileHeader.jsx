const ProfileHeader = ({ role }) => (
  <div className="mb-8 text-center">
    <h1 className="text-3xl font-bold text-gray-800">Update Profile</h1>
    <p className="text-gray-500 mt-1 text-sm">
      {role === "doctor"
        ? "Keep your doctor profile accurate for your patients"
        : "Manage your personal and medical information"}
    </p>
    <span
      className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
        role === "doctor"
          ? "bg-primary/10 text-primary border border-primary/20"
          : "bg-blue-50 text-blue-600 border border-blue-200"
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {role === "doctor" ? "Doctor Account" : "Patient Account"}
    </span>
  </div>
);

export default ProfileHeader;
