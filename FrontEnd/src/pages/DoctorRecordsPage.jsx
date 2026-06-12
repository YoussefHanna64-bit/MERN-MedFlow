import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorRecords } from "../redux/slices/medicalRecordSlice";
import { FileText, UserRound, Calendar, Pill } from "lucide-react";

const DoctorRecordsPage = () => {
  const dispatch = useDispatch();
  const { doctorRecords, loading, error } = useSelector(
    (state) => state.medicalRecords,
  );

  useEffect(() => {
    dispatch(fetchDoctorRecords());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#F4F6F5] p-6 md:p-12 font-body flex justify-center items-start">
      <div className="max-w-5xl w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="text-[#008484] w-8 h-8" />
            Patient Records Directory
          </h1>
          <p className="text-gray-500 mt-2">
            View all medical records and prescriptions you have issued to
            patients.
          </p>
        </div>

        {loading ? (
          <p className="text-[#008484] font-semibold animate-pulse">
            Loading patient records...
          </p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : doctorRecords.length === 0 ? (
          <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-lg">
              You haven't created any medical records yet. Complete an
              appointment to create one.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {doctorRecords.map((record) => (
              <div
                key={record._id}
                className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-6 gap-4">
                  <div className="flex items-center gap-3 text-lg font-bold text-gray-900">
                    <div className="w-10 h-10 bg-[#E6F3F3] text-[#008484] rounded-full flex items-center justify-center">
                      <UserRound className="w-5 h-5" />
                    </div>
                    {record.patient?.name || "Unknown Patient"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <Calendar className="w-4 h-4 text-[#008484]" />
                    {new Date(record.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Primary Diagnosis
                    </h3>
                    <p className="text-[#008484] font-bold text-xl">
                      {record.diagnosis}
                    </p>
                  </div>

                  {record.symptoms && record.symptoms.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Symptoms
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {record.symptoms.map((symptom, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {record.notes && (
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Clinical Notes
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {record.notes}
                    </p>
                  </div>
                )}

                {record.prescription && (
                  <div className="border-t border-dashed border-gray-200 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Pill className="w-5 h-5 text-[#008484]" />
                      <h3 className="text-md font-bold text-gray-900">
                        Issued Prescription
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {record.prescription.medications &&
                        record.prescription.medications.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                              Medications
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {record.prescription.medications.map(
                                (med, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#008484] text-white shadow-sm"
                                  >
                                    {med.name || med}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                      {record.prescription.instructions && (
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                            Instructions
                          </h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {record.prescription.instructions}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorRecordsPage;
