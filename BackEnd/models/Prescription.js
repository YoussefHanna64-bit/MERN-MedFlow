import mongoose from "mongoose";

const { Schema } = mongoose;

const prescriptionSchema = new Schema(
  {
    record: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true,
    },
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
    medications: [
      {
        name: {
          type: String,
          required: true,
        },
        dosage: {
          type: String,
          required: true,
        },
        frequency: {
          type: String,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Prescription", prescriptionSchema);
