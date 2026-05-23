import { Provider } from "react-redux";
import "./App.css";
import { doctorAppointmentsStore } from "./redux/store/store";
import BookAppointmentForm from "./pages/BookAppointmentForm";

function App() {
  return (
    <div className="h-full">
      <Provider store={doctorAppointmentsStore}>
        <BookAppointmentForm />
      </Provider>
    </div>
  );
}

export default App;
