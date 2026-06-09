import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router";
import { fetchAllUsers } from "../redux/thunks/admin/fetchAllUsers";
import { toggleUserStatus } from "../redux/thunks/admin/toggleUserStatus";
import { fetchDashboardStats } from "../redux/thunks/admin/fetchDashboardStats";
import { toast } from "react-hot-toast";
import StatsGrid from "../components/admin/StatsGrid";
import UserTable from "../components/admin/UserTable";
import UserDrawer from "../components/admin/UserDrawer";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { usersList, pagination, isLoading, error } = useSelector(
    (state) => state.admin,
  );

  const [currentView, setCurrentView] = useState("all-users");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const location = useLocation();
  const isSignupRoute = location.pathname.includes("/admin-dashboard/signup");

  useEffect(() => {
    if (!isSignupRoute) {
      dispatch(fetchAllUsers({ page: 1, limit: 10 }));
      dispatch(fetchDashboardStats());
    }
  }, [dispatch, isSignupRoute]);

  const filteredUsers = usersList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (currentView === "doctors")
      return matchesSearch && user.role === "doctor";
    if (currentView === "banned") return matchesSearch && !user.isActive;
    return matchesSearch;
  });

  const handleStatusToggle = (userId, userName) => {
    toast.promise(dispatch(toggleUserStatus(userId)).unwrap(), {
      loading: "Updating account permissions...",
      success: <b>Compliance state updated for {userName}!</b>,
      error: <b>Failed to modify account settings.</b>,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {isSignupRoute ? (
          <Outlet />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, Admin!
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Select an operation node below to review directory states or
                onboard staff assets.
              </p>
            </div>
            <StatsGrid
              pagination={pagination}
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
              {currentView === "onboard" ? (
                <div className="space-y-8 py-12 text-center text-slate-700">
                  <p className="text-lg font-semibold">
                    Choose which staff signup flow to launch:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 max-w-xl mx-auto">
                    <Link
                      to="signup/doctor"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#008484] px-6 py-4 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-teal-700 hover:-translate-y-0.5"
                    >
                      Doctor Signup
                    </Link>
                    <Link
                      to="signup/admin"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#008484] px-6 py-4 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-teal-700 hover:-translate-y-0.5"
                    >
                      Admin Signup
                    </Link>
                  </div>
                  <p className="text-xs text-slate-400">
                    Use the doctor signup link to create a new doctor account,
                    or the admin signup button to start the admin onboarding
                    flow.
                  </p>
                </div>
              ) : (
                <UserTable
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filteredUsers={filteredUsers}
                  currentView={currentView}
                  setSelectedUser={setSelectedUser}
                  handleStatusToggle={handleStatusToggle}
                />
              )}
            </div>
            <UserDrawer
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              handleStatusToggle={handleStatusToggle}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
