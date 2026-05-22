import { Provider } from "react-redux";
import "./App.css";
import DoctorAppointments from "./pages/DoctorAppointments";
import { doctorAppointmentsStore } from "./redux/store/store";

function App() {
  return (
    <div className="h-full">
      <Provider store={doctorAppointmentsStore}>
        <DoctorAppointments />
      </Provider>
    </div>
  );
}

export default App;
