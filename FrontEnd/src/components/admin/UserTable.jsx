import React from "react";

const UserTable = ({
  searchQuery,
  setSearchQuery,
  filteredUsers,
  currentView,
  setSelectedUser,
  handleStatusToggle,
}) => {
  return (
    <div>
      <div className="mb-6 max-w-md relative">
        <input
          type="text"
          placeholder="Search user record via full name or email address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 text-sm transition-all shadow-inner bg-slate-50/50"
        />
        <span className="absolute left-3.5 top-3.5 text-slate-400">🔍</span>
      </div>

      <div className="w-full overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <th className="py-4 px-6">User Profile Details</th>
              <th className="py-4 px-6">System Role</th>
              <th className="py-4 px-6">Active Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-8 text-center text-slate-400 font-medium"
                >
                  No users matched your search criteria or filter parameters.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-slate-50/60 transition-all"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center border uppercase text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 leading-tight">
                          {user.name}
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                        user.role === "admin"
                          ? "bg-purple-50 text-purple-700"
                          : user.role === "doctor"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold ${user.isActive ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-emerald-500" : "bg-rose-500"}`}
                      ></span>
                      {user.isActive ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                      title="See Profile Details"
                    >
                      ➔
                    </button>
                    <button
                      onClick={() => handleStatusToggle(user._id, user.name)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        user.isActive
                          ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                          : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {user.isActive ? "Ban" : "Unban"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
