import { useState } from "react";
import "./MedicalRecordForm.css";

const MedicalRecordForm = () => {
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [symptomInput, setSymptomInput] = useState("");
  const [symptomsList, setSymptomsList] = useState([]);

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

  const handleSubmitRecord = (e) => {
    e.preventDefault();
    const recordPayload = {
      patientId: "DUMMY_PATIENT_ID",
      appointmentId: "DUMMY_APPOINTMENT_ID",
      diagnosis,
      symptoms: symptomsList,
      notes,
    };
    console.log("Ready to send to backend:", recordPayload);
    alert("Record saved! Check console for payload.");
  };

  return (
    <div className="medical-form-dashboard">
      <div className="medical-form-card">
        {/* Enhanced Header with Icon */}
        <div className="form-header">
          <div className="header-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
          </div>
          <div>
            <h2>Consultation Record</h2>
            <p className="form-subtitle">
              Document the patient's visit and diagnosis details.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmitRecord} className="medical-form">
          <div className="form-group">
            <label htmlFor="diagnosis">
              Primary Diagnosis <span className="required">*</span>
            </label>
            <input
              type="text"
              id="diagnosis"
              placeholder="e.g., Acute Bronchitis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="symptoms">Observed Symptoms</label>
            <div className="symptom-input-row">
              <input
                type="text"
                id="symptoms"
                placeholder="e.g., Persistent cough"
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSymptom(e)}
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={handleAddSymptom}
              >
                Add
              </button>
            </div>

            {symptomsList.length > 0 && (
              <div className="symptoms-tags-container">
                {symptomsList.map((symp, index) => (
                  <span key={index} className="symptom-pill">
                    {symp}
                    <button
                      type="button"
                      onClick={() => handleRemoveSymptom(symp)}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="notes">Clinical Notes</label>
            <textarea
              id="notes"
              rows="4"
              placeholder="Add any additional observations, lifestyle advice, or treatment plans..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={!diagnosis}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "8px" }}
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordForm;
