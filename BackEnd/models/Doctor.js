import mongoose from "mongoose";

const { Schema } = mongoose;

const doctorProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
  },
  addresses: [{ type: String, required: [true, "Address is required"] }],
  description: { type: String },
  fees: { type: Number, required: [true, "Fees is required"] },
  availability: [
    {
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
      slots: [
        {
          startTime: { type: String, required: true },
          endTime: { type: String, required: true },
          isBooked: { type: Boolean, default: false },
        },
      ],
    },
  ],
  rating: { type: Number, default: 0 },
  image: { type: String },
});

export const doctorModel = mongoose.model("DoctorProfile", doctorProfileSchema);
export default doctorModel;
