import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientRecords } from "../redux/slices/medicalRecordSlice";
import { FileText, UserRound, Calendar } from "lucide-react";

const PatientRecordsPage = () => {
  const dispatch = useDispatch();

  // Grab the logged-in user from auth to get their ID
  const { user } = useSelector((state) => state.auth);
  const { records, loading, error } = useSelector(
    (state) => state.medicalRecords,
  );

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchPatientRecords(user._id));
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-[#F4F6F5] p-6 md:p-12 font-body">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="text-[#008484] w-8 h-8" />
            My Medical Records
          </h1>
          <p className="text-gray-500 mt-2">
            View your consultation history and doctor notes.
          </p>
        </div>

        {loading ? (
          <p className="text-[#008484] font-semibold animate-pulse">
            Loading your medical history...
          </p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : records.length === 0 ? (
          <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-lg">
              No medical records found. Your doctor will upload them after your
              visits.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {records.map((record) => (
              <div
                key={record._id}
                className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              >
                {/* Header: Date & Doctor */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-4">
                  <div className="flex items-center gap-3 text-[#008484] font-semibold">
                    <Calendar className="w-5 h-5" />
                    {new Date(record.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 bg-[#E6F3F3] px-4 py-2 rounded-full text-sm font-medium">
                    <UserRound className="w-4 h-4" />
                    Dr. {record.doctor?.name || "Unknown"}
                  </div>
                </div>

                {/* Body: Diagnosis & Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Diagnosis
                    </h3>
                    <p className="text-gray-900 font-semibold text-lg">
                      {record.diagnosis}
                    </p>
                  </div>

                  {record.symptoms && record.symptoms.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Symptoms
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {record.symptoms.map((symptom, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {record.notes && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Doctor's Notes
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {record.notes}
                    </p>
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

export default PatientRecordsPage;
