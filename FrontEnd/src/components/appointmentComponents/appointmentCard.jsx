const AppointmentCard = ({ appointment }) => {
  return (
    <div className="flex justify-between items-center shadow-md bg-gray-100 p-5 rounded-2xl">
      <div>
        <span className="text-lg font-semibold text-gray-700">
          {appointment.patient.name}
        </span>
        <span className="block text-gray-500">{appointment.reason}</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-primary/30 p-2 rounded-xl mb-1">
          <span className="text-xs font-semibold">{appointment.timeSlot}</span>
        </div>
        <div className="bg-red-900/30 p-2 rounded-xl">
          <span className="block text-red-950 text-xs font-semibold">
            {appointment.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
