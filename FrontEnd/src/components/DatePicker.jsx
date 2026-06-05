import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const MyDatePicker = ({ inputData, setInputData, errors, setErrors }) => {
  const [selected, setSelected] = useState(null);
  const handleOnSelect = (date) => {
    setSelected(date);
    setInputData({ ...inputData, date: format(date, "yyyy-MM-dd") });
    if (errors["date"]) setErrors({ ...errors, date: "" });
  };

  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={handleOnSelect}
      disabled={{ before: new Date() }}
      startMonth={new Date()}
      className="bg-gray-100 rounded-xl p-4 mt-2"
      classNames={{
        month_caption: "text-gray-800 font-semibold",
        today: "text-primary",
        selected:
          "bg-primary rounded-lg text-white transition-colors duration-200",
        day_button: "font-semibold px-2 py-1 rounded-lg hover:bg-primary/20 ",
        button_previous:
          "p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200",
        button_next:
          "p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200",
        chevron: "fill-gray-600",
      }}
      styles={{
        month_caption: { marginBottom: "12px" },
        nav: { marginBottom: "12px" },
      }}
    />
  );
};

export default MyDatePicker;
