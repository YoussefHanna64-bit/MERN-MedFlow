const FormSummary = () => {
  return (
    <>
      <div className="bg-white p-5 rounded h-full col-span-2 border-l-4 border-primary">
        <div className="flex-col items-center">
          <label
            htmlFor="preferredDateID"
            className="text-gray-600 font-semibold uppercase"
          >
            Summary
          </label>
          <div className="mt-10 flex justify-between items-center">
            <span className="text-gray-700">Consultation Fee</span>
            <span className="text-primary text-2xl font-bold">$125.00</span>
          </div>
          <div className="mt-10 flex justify-between items-center">
            <span className="text-gray-700">Lab Service Deposite</span>
            <span className="text-gray700 font-semibold">$45.00</span>
          </div>
          <div className="mt-10 flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Estimated Total</span>
            <span className="text-gray700 font-semibold text-xl">$170.00</span>
          </div>
          <div className="mt-10 flex justify-center">
            <button className="bg-primary text-white text-lg font-semibold px-6 py-3 rounded-lg cursor-pointer hover:bg-[#006c73]">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSummary;
