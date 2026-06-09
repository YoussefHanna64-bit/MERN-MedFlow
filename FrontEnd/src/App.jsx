import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import "./App.css";
import { clinicalSystemStore } from "./redux/store/store";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./guards/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import PatientAppointments from "./pages/PatientAppointments";
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/AdminDashboard";

const Login = lazy(() => import("./pages/Login"));
const PatientSignUp = lazy(() => import("./pages/SignUp"));
const DoctorSignUp = lazy(() => import("./pages/DoctorSignUp"));
const AdminSignUp = lazy(() => import("./pages/AdminSignUp"));
const DoctorAppointments = lazy(() => import("./pages/DoctorAppointments"));
const DoctorAvailabilityPage = lazy(
  () => import("./pages/DoctorAvailabilityPage"),
);
const BookAppointmentForm = lazy(() => import("./pages/BookAppointmentForm"));
const FindDoctorPage = lazy(() => import("./pages/findDoctor/FindDoctorPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PatientHomePage = lazy(() => import("./pages/PatientHomePage"));
const PatientRecordsPage = lazy(() => import("./pages/PatientRecordsPage"));
const UpdateProfilePage = lazy(() => import("./pages/UpdateProfilePage"));

const routerCofig = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "patient-home",
            element: <PatientHomePage />,
          },
          {
            path: "find-doctor",
            element: <FindDoctorPage />,
          },
          {
            path: "book-appointment",
            element: <BookAppointmentForm />,
          },
          {
            path: "doctor-appointments",
            element: <DoctorAppointments />,
          },
          {
            path: "doctor-availability",
            element: <DoctorAvailabilityPage />,
          },
          {
            path: "patient-appointments",
            element: <PatientAppointments />,
          },
          {
            path: "patient-records",
            element: <PatientRecordsPage />,
          },
          {
            path: "update-profile",
            element: <UpdateProfilePage />,
          },
          {
            path: "payment",
            element: <Payment />,
          },
          {
            path: "admin-dashboard",
            element: <AdminDashboard />,
            children: [
              {
                path: "signup/doctor",
                element: <DoctorSignUp />,
              },
              {
                path: "signup/admin",
                element: <AdminSignUp />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <PatientSignUp />,
      },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace /> },
]);

function App() {
  return (
    <div className="h-full">
      <Toaster />
      <Provider store={clinicalSystemStore}>
        <RouterProvider router={routerCofig} />
      </Provider>
    </div>
  );
}

export default App;
