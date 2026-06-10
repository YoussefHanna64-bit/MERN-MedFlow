import mongoose from "mongoose";

const { Schema } = mongoose;
const phoneRegx = /^01[0125][0-9]{8}$/;
const doctorProfileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    mainClinic: {
      type: String,
      required: true,
    },
    assistant_phones: [
      {
        type: String,
        required: [true, "Phone is required"],
        match: [phoneRegx, "Please provide a valid phone number"],
      },
    ],
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    addresses: [{ type: String, required: [true, "Address is required"] }],
    description: { type: String },
    fees: { type: Number, required: [true, "Fees is required"] },
    availability: [
      {
        date: {
          type: Date,
          required: true,
        },
        day: {
          type: String,
          required: true,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        location: {
          type: String,
          default: "Main Clinic",
        },
        slots: [
          {
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
            status: {
              type: String,
              enum: ["available", "full", "doctor absent"],
              default: "available",
            },
          },
        ],
      },
    ],
    rating: { type: Number, default: 0 },
    image: { type: String },
    embeddings: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true },
);

export const doctorModel = mongoose.model("DoctorProfile", doctorProfileSchema);
export default doctorModel;
