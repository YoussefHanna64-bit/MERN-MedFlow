import React, { useEffect, useState } from "react";
import api from "../../redux/api";

const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase());
};

const formatValue = (value) => {
  if (value === null || value === undefined) return "Not provided";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  if (value === true) return "Yes";
  if (value === false) return "No";
  return value;
};

const renderDetails = (data) => {
  return Object.entries(data)
    .filter(
      ([key]) =>
        !["password", "__v", "user", "_id"].includes(key) &&
        data[key] !== undefined,
    )
    .map(([key, value]) => (
      <div key={key}>
        <label className="text-xs text-slate-400 uppercase font-bold">
          {formatLabel(key)}
        </label>
        <p className="text-sm font-semibold text-slate-800 mt-0.5 whitespace-pre-wrap">
          {formatValue(value)}
        </p>
      </div>
    ));
};

const UserDrawer = ({ selectedUser, setSelectedUser, handleStatusToggle }) => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedUser) {
      setDetails(null);
      setError(null);
      return;
    }

    let isActive = true;
    const fetchUserDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get(`/user/${selectedUser._id}`);
        if (!isActive) return;
        setDetails(response.data.data);
      } catch (err) {
        if (!isActive) return;
        setError(
          err.response?.data?.message || "Unable to load user profile details.",
        );
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchUserDetails();

    return () => {
      isActive = false;
    };
  }, [selectedUser]);

  if (!selectedUser) return null;

  const userData = details?.user || selectedUser;
  const profileData = details?.profile;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-all duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">
              Account File Audit
            </h3>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-slate-400 hover:text-slate-600 text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading profile details...</p>
          ) : error ? (
            <p className="text-sm text-rose-600">{error}</p>
          ) : (
            <div className="space-y-4">
              {renderDetails({
                Name: userData.name,
                Email: userData.email,
                Phone: userData.phone,
                Role: userData.role,
                Status: userData.isActive ? "Active" : "Suspended",
                CreatedAt: userData.createdAt,
                UpdatedAt: userData.updatedAt,
              })}

              {profileData ? (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3">
                    {userData.role === "doctor"
                      ? "Doctor Profile"
                      : "Patient Profile"}
                  </h4>
                  {renderDetails(profileData)}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Footer Button */}
        <div className="p-6 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={() => {
              handleStatusToggle(selectedUser._id, selectedUser.name);
              setSelectedUser(null);
            }}
            className={`w-full py-2.5 rounded-xl font-bold text-sm text-white transition-transform active:scale-95 ${
              selectedUser.isActive ? "bg-rose-600" : "bg-emerald-600"
            }`}
          >
            {selectedUser.isActive
              ? "Enforce Account Ban Suspension"
              : "Lift Suspension & Restore Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDrawer;
