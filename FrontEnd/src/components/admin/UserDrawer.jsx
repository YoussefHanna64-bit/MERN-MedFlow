import React from "react";

const UserDrawer = ({ selectedUser, setSelectedUser, handleStatusToggle }) => {
  if (!selectedUser) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between transform transition-all duration-300">
        <div>
          <div className="flex justify-between items-center border-b pb-4 mb-6">
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
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 uppercase font-bold">
                Full Identity Name
              </label>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {selectedUser.name}
              </p>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase font-bold">
                Email Communication Handle
              </label>
              <p className="text-sm font-semibold text-slate-600 font-mono mt-0.5">
                {selectedUser.email}
              </p>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase font-bold">
                Contact Mobile Phone
              </label>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {selectedUser.phone || "No phone connected"}
              </p>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase font-bold">
                Database Allocation ID
              </label>
              <p className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded-lg mt-1">
                {selectedUser._id}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            handleStatusToggle(selectedUser._id, selectedUser.name);
            setSelectedUser(null);
          }}
          className={`w-full py-2.5 rounded-xl font-bold text-sm text-white transition-transform active:scale-95 ${selectedUser.isActive ? "bg-rose-600" : "bg-emerald-600"}`}
        >
          {selectedUser.isActive
            ? "Enforce Account Ban Suspension"
            : "Lift Suspension & Restore Profile"}
        </button>
      </div>
    </div>
  );
};

export default UserDrawer;
