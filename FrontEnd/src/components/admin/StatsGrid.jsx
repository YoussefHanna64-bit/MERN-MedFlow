import React from "react";
import { UserIcon, PlusIcon, DoctorIcon, BanIcon } from "./Icons";

const StatsGrid = ({ pagination = {}, currentView, setCurrentView }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <button
        onClick={() => setCurrentView("all-users")}
        className={`p-6 rounded-2xl border text-left transition-all duration-200 ${
          currentView === "all-users"
            ? "bg-white border-teal-600 shadow-md ring-1 ring-teal-600/30"
            : "bg-white border-slate-100 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="flex justify-between items-start">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentView === "all-users" ? "bg-teal-50 text-teal-600" : "bg-slate-50 text-slate-500"}`}
          >
            <UserIcon />
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tight">
            {pagination?.totalUsers || 0}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mt-4">Get All Users</h3>
        <p className="text-xs text-slate-400 mt-1">
          Review, audit, and analyze entire patient and staff directory
          profiles.
        </p>
      </button>

      <button
        onClick={() => setCurrentView("onboard")}
        className={`p-6 rounded-2xl border text-left transition-all duration-200 ${
          currentView === "onboard"
            ? "bg-white border-teal-600 shadow-md ring-1 ring-teal-600/30"
            : "bg-white border-slate-100 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="flex justify-between items-start">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentView === "onboard" ? "bg-teal-50 text-teal-600" : "bg-slate-50 text-slate-500"}`}
          >
            <PlusIcon />
          </div>
          <span className="text-xs font-bold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
            Action
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mt-4">
          New Admin or Doctor
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Provision custom system credentials to securely onboard new medical
          staff.
        </p>
      </button>

      <button
        onClick={() => setCurrentView("doctors")}
        className={`p-6 rounded-2xl border text-left transition-all duration-200 ${
          currentView === "doctors"
            ? "bg-white border-teal-600 shadow-md ring-1 ring-teal-600/30"
            : "bg-white border-slate-100 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="flex justify-between items-start">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentView === "doctors" ? "bg-teal-50 text-teal-600" : "bg-slate-50 text-slate-500"}`}
          >
            <DoctorIcon />
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tight">
            {pagination?.totalDoctors || 0}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mt-4">
          See All Doctors
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Isolate professional medical channels to monitor availability and
          verification logs.
        </p>
      </button>

      <button
        onClick={() => setCurrentView("banned")}
        className={`p-6 rounded-2xl border text-left transition-all duration-200 ${
          currentView === "banned"
            ? "bg-white border-teal-600 shadow-md ring-1 ring-teal-600/30"
            : "bg-white border-slate-100 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="flex justify-between items-start">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentView === "banned" ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-500"}`}
          >
            <BanIcon />
          </div>
          <span
            className={`text-2xl font-black tracking-tight ${pagination?.totalBanned > 0 ? "text-rose-600" : "text-slate-800"}`}
          >
            {pagination?.totalBanned || 0}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mt-4">
          See Banned Users
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Manage platform restrictions, compliance violations, and ban status
          parameters.
        </p>
      </button>
    </div>
  );
};

export default StatsGrid;
