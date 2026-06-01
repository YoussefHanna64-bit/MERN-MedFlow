import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
