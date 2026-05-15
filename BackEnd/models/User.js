import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Don't forget to import bcrypt!

const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegx = /^01[0125][0-9]{8}$/;
const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const { Schema } = mongoose;

// 1. Define the Schema fields and options
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [4, "Name must be at least 4 characters long"],
      maxlength: [20, "Name must be at most 20 characters long"],
    },
    email: {
      type: String,
      unique: true, // Simplified: unique doesn't take a custom error message like 'required'
      required: [true, "Email is required"],
      match: [emailRegx, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [
        passwordRegx,
        "Password must be at least 8 characters, at least one letter and one number",
      ],
    },
    phone: {
      type: String,
      match: [phoneRegx, "Please provide a valid phone number"],
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
