import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import "./App.css";
import { doctorAppointmentsStore } from "./redux/store/store";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
const DoctorAppointments = lazy(() => import("./pages/DoctorAppointments"));
const Login = lazy(() => import("./pages/Login"));
const PatientSignUp = lazy(() => import("./pages/SignUp"));
const DoctorSignUp = lazy(() => import("./pages/DoctorSignUp"));

const routerCofig = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: "home",
        element: <DoctorAppointments />,
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
        index: true,
        element: <Navigate to="/signup" replace />,
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
      <Provider store={doctorAppointmentsStore}>
        <RouterProvider router={routerCofig} />
      </Provider>
    </div>
  );
}

export default App;
