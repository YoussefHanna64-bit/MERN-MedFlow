import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  createNewMedicalRecord,
  createPrescription,
} from "../redux/slices/medicalRecordSlice";
import toast from "react-hot-toast";
import { FileText, Plus, X, CheckCircle, Pill } from "lucide-react";

const MedicalRecordForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const patientId = location.state?.patientId;
  const appointmentId = location.state?.appointmentId;

  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const [symptomInput, setSymptomInput] = useState("");
  const [symptomsList, setSymptomsList] = useState([]);

  const [medicationInput, setMedicationInput] = useState("");
  const [medicationsList, setMedicationsList] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSymptom = (e) => {
    e.preventDefault();
    if (symptomInput.trim() && !symptomsList.includes(symptomInput.trim())) {
      setSymptomsList([...symptomsList, symptomInput.trim()]);
      setSymptomInput("");
    }
  };
  const handleRemoveSymptom = (symptomToRemove) => {
    setSymptomsList(symptomsList.filter((s) => s !== symptomToRemove));
  };

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (
      medicationInput.trim() &&
      !medicationsList.includes(medicationInput.trim())
    ) {
      setMedicationsList([...medicationsList, medicationInput.trim()]);
      setMedicationInput("");
    }
  };
  const handleRemoveMedication = (medToRemove) => {
    setMedicationsList(medicationsList.filter((m) => m !== medToRemove));
  };

  const handleSubmitRecord = async (e) => {
    e.preventDefault();

    if (!patientId || !appointmentId) {
      toast.error("Missing patient or appointment data.");
      return;
    }

    setIsSubmitting(true);

    try {
      const recordPayload = {
        patientId,
        appointmentId,
        diagnosis,
        symptoms: symptomsList,
        notes,
      };

      const createdRecord = await dispatch(
        createNewMedicalRecord(recordPayload),
      ).unwrap();

      if (medicationsList.length > 0 || instructions.trim() !== "") {
        const formattedMedications = medicationsList.map((med) => ({
          name: med,
          dosage: "As directed",
          frequency: "As directed",
          duration: "As directed",
        }));

        const prescriptionPayload = {
          recordId: createdRecord._id,
          patientId,
          medications: formattedMedications,
          instructions,
        };

        await dispatch(createPrescription(prescriptionPayload)).unwrap();
      }

      toast.success("Medical record & prescription saved successfully!");
      navigate("/doctor-appointments");
    } catch (error) {
      toast.error(error || "An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] py-12 px-4 sm:px-6 lg:px-8 font-body flex justify-center items-start">
      <div className="w-full max-w-[800px] bg-white p-8 md:p-10 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#f0fdf4]">
        <div className="flex items-center gap-5 mb-10 pb-6 border-b border-[#f3f4f6]">
          <div className="bg-[#e6f2f2] text-[#008484] p-4 rounded-[16px] flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-[1.5rem] font-bold text-[#111827] mb-1">
              Consultation Record
            </h2>
            <p className="text-[0.95rem] text-[#6b7280]">
              Document the patient's visit and diagnosis details securely.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmitRecord} className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="diagnosis"
              className="font-semibold text-[#374151] text-[0.9rem] ml-1"
            >
              Primary Diagnosis <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              id="diagnosis"
              placeholder="e.g., Acute Bronchitis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
              className="w-full p-[0.875rem_1.25rem] bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] text-base text-[#1f2937] outline-none transition-all duration-200 focus:bg-white focus:border-[#008484] focus:shadow-[0_0_0_4px_rgba(0,132,132,0.1)] placeholder:text-[#9ca3af]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="symptoms"
              className="font-semibold text-[#374151] text-[0.9rem] ml-1"
            >
              Observed Symptoms
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="symptoms"
                placeholder="e.g., Persistent cough"
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSymptom(e)}
                className="flex-1 p-[0.875rem_1.25rem] bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] text-base text-[#1f2937] outline-none transition-all duration-200 focus:bg-white focus:border-[#008484] focus:shadow-[0_0_0_4px_rgba(0,132,132,0.1)] placeholder:text-[#9ca3af]"
              />
              <button
                type="button"
                onClick={handleAddSymptom}
                className="px-6 bg-[#f3f4f6] text-[#4b5563] rounded-[12px] font-semibold transition-colors duration-200 hover:bg-[#e5e7eb] hover:text-[#111827] flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add
              </button>
            </div>

            {symptomsList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {symptomsList.map((symp, index) => (
                  <span
                    key={index}
                    className="bg-[#f0fdfa] text-[#0d9488] pl-4 pr-2 py-1.5 rounded-full text-[0.875rem] font-semibold flex items-center gap-2 border border-[#ccfbf1]"
                  >
                    {symp}
                    <button
                      type="button"
                      onClick={() => handleRemoveSymptom(symp)}
                      className="bg-[#ccfbf1] text-[#0d9488] w-[22px] h-[22px] rounded-full flex items-center justify-center hover:bg-[#99f6e4] hover:text-[#0f766e] transition-colors"
                    >
                      <X className="w-3 h-3" strokeWidth={3} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="notes"
              className="font-semibold text-[#374151] text-[0.9rem] ml-1"
            >
              Clinical Notes
            </label>
            <textarea
              id="notes"
              placeholder="Add observations, lifestyle advice, or treatment plans..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-40 resize-none p-[0.875rem_1.25rem] bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] text-base text-[#1f2937] outline-none transition-all duration-200 focus:bg-white focus:border-[#008484] focus:shadow-[0_0_0_4px_rgba(0,132,132,0.1)] placeholder:text-[#9ca3af]"
            ></textarea>
          </div>

          <hr className="border-[#f3f4f6] my-2" />

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#E6F3F3] flex items-center justify-center text-[#008484]">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Digital Prescription{" "}
                <span className="text-sm font-medium text-gray-400 ml-1">
                  (Optional)
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                Medications added here will issue a digital prescription.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="medications"
              className="font-semibold text-[#374151] text-[0.9rem] ml-1"
            >
              Medications
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="medications"
                placeholder="e.g., Amoxicillin 500mg"
                value={medicationInput}
                onChange={(e) => setMedicationInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddMedication(e)}
                className="flex-1 p-[0.875rem_1.25rem] bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] text-base text-[#1f2937] outline-none transition-all duration-200 focus:bg-white focus:border-[#008484] focus:shadow-[0_0_0_4px_rgba(0,132,132,0.1)] placeholder:text-[#9ca3af]"
              />
              <button
                type="button"
                onClick={handleAddMedication}
                className="px-6 bg-[#f3f4f6] text-[#4b5563] rounded-[12px] font-semibold transition-colors duration-200 hover:bg-[#e5e7eb] hover:text-[#111827] flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add
              </button>
            </div>

            {medicationsList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {medicationsList.map((med, index) => (
                  <span
                    key={index}
                    className="bg-[#008484] text-white pl-4 pr-2 py-1.5 rounded-full text-[0.875rem] font-semibold flex items-center gap-2 shadow-sm"
                  >
                    {med}
                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(med)}
                      className="text-teal-100 hover:text-white transition-colors w-[22px] h-[22px] flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="instructions"
              className="font-semibold text-[#374151] text-[0.9rem] ml-1"
            >
              Prescription Instructions
            </label>
            <textarea
              id="instructions"
              rows="2"
              placeholder="e.g., Take one tablet twice daily after meals."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full resize-none p-[0.875rem_1.25rem] bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] text-base text-[#1f2937] outline-none transition-all duration-200 focus:bg-white focus:border-[#008484] focus:shadow-[0_0_0_4px_rgba(0,132,132,0.1)] placeholder:text-[#9ca3af]"
            ></textarea>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!diagnosis || isSubmitting}
              className="flex items-center justify-center gap-2 bg-[#008484] text-white px-8 py-[0.875rem] rounded-[12px] text-base font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(0,132,132,0.2)] hover:bg-[#006b6b] hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(0,132,132,0.3)] disabled:bg-[#d1d5db] disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none w-full md:w-auto"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Saving Record...</span>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" /> Save Record & Prescription
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordForm;
