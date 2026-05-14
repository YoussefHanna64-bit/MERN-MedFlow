import mongoose from "mongoose";

const { Schema } = mongoose;

const appointemetSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
    },
    date: {
        type: Date,
        required: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: "pending",
    },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "refunded"],
        default: "unpaid"
    },
    stripeSessionId: {
        type: String
    },
    reason: { type: String },
    amount: {
        type: Number,
        required: true
    }
})

const appointmentModel = mongoose.model("Appointement", appointemetSchema);

export default appointmentModel;