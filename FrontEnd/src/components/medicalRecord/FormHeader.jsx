import { FileText } from "lucide-react";

const FormHeader = () => {
  return (
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
  );
};

export default FormHeader;
