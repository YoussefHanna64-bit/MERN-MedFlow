import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  createNewMedicalRecord,
  createPrescription,
} from "../../redux/slices/medicalRecordSlice";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import FormHeader from "../components/medicalRecord/FormHeader";
import ClinicalRecordSection from "../components/medicalRecord/ClinicalRecordSection";
import PrescriptionSection from "../components/medicalRecord/PrescriptionSection";

const CreateRecordPage = () => {
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
        <FormHeader />

        <form onSubmit={handleSubmitRecord} className="flex flex-col gap-7">
          <ClinicalRecordSection
            diagnosis={diagnosis}
            setDiagnosis={setDiagnosis}
            notes={notes}
            setNotes={setNotes}
            symptomInput={symptomInput}
            setSymptomInput={setSymptomInput}
            symptomsList={symptomsList}
            handleAddSymptom={handleAddSymptom}
            handleRemoveSymptom={handleRemoveSymptom}
          />

          <hr className="border-[#f3f4f6] my-2" />

          <PrescriptionSection
            medicationInput={medicationInput}
            setMedicationInput={setMedicationInput}
            medicationsList={medicationsList}
            handleAddMedication={handleAddMedication}
            handleRemoveMedication={handleRemoveMedication}
            instructions={instructions}
            setInstructions={setInstructions}
          />

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

export default CreateRecordPage;
