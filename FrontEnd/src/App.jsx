import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import "./App.css";
import { doctorAppointmentsStore } from "./redux/store/store";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./guards/ProtectedRoute";
const Login = lazy(() => import("./pages/Login"));
const PatientSignUp = lazy(() => import("./pages/SignUp"));
const DoctorSignUp = lazy(() => import("./pages/DoctorSignUp"));
import { Toaster } from "react-hot-toast";
const DoctorAppointments = lazy(() => import("./pages/DoctorAppointments"));
const BookAppointmentForm = lazy(() => import("./pages/BookAppointmentForm"));

const routerCofig = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "home",
            element: <BookAppointmentForm />,
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
  { path: "*", element: <Navigate to="/home" replace /> },
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
