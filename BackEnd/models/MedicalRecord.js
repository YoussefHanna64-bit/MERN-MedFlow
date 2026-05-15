import mongoose from "mongoose";

const { Schema } = mongoose;

const mdeicalRecordSchema = new Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    }, // P1 will make this model
    diagnosis: {
      type: String,
      required: [true, "Diagnosis is required"],
    },
    symptoms: [{ type: String }],
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("MedicalRecord", mdeicalRecordSchema);
