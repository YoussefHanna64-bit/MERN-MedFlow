import { Plus, X } from "lucide-react";

const ClinicalRecordSection = ({
  diagnosis,
  setDiagnosis,
  notes,
  setNotes,
  symptomInput,
  setSymptomInput,
  symptomsList,
  handleAddSymptom,
  handleRemoveSymptom,
}) => {
  return (
    <div className="flex flex-col gap-7">
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
    </div>
  );
};

export default ClinicalRecordSection;
