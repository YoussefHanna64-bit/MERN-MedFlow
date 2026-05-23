import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import "./App.css";
import { doctorAppointmentsStore } from "./redux/store/store";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
const DoctorAppointments = lazy(() => import("./pages/DoctorAppointments"));

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
    children: [],
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
