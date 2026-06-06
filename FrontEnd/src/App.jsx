import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import "./App.css";
import { doctorAppointmentsStore } from "./redux/store/store";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./guards/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./pages/Login"));
const PatientSignUp = lazy(() => import("./pages/SignUp"));
const DoctorSignUp = lazy(() => import("./pages/DoctorSignUp"));
const DoctorAppointments = lazy(() => import("./pages/DoctorAppointments"));
const BookAppointmentForm = lazy(() => import("./pages/BookAppointmentForm"));
const FindDoctorPage = lazy(() => import("./pages/findDoctor/FindDoctorPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PatientHomePage = lazy(() => import("./pages/PatientHomePage"));

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
      {
        path: "signup/doctor",
        element: <DoctorSignUp />,
      },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace /> },
]);

function App() {
  return (
    <div className="h-full">
      <Toaster />
      <Provider store={doctorAppointmentsStore}>
        <RouterProvider router={routerCofig} />
      </Provider>
    </div>
  );
}

export default App;
