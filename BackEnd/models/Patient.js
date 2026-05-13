import mongoose from "mongoose";

const { Schema } = mongoose;
const phoneRegx = /^01[0125][0-9]{8}$/;
const patientProfileSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: [true, "Blood type is required"],
  },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["male", "female"] },
  emergencyContact: {
    type: String,
    match: [phoneRegx, "Please provide a valid phone number"],
  },
});
const patientModel = mongoose.model("PatientProfile", patientProfileSchema);
export default patientModel; 
