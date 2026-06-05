import mongoose from "mongoose";

const { Schema } = mongoose;

const medicalNotificationSchema = new Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: [true, "Recipient is required"],
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: [true, "Sender is required"], 
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Indexing by recipient so fetching a user's inbox remains lightning fast
medicalNotificationSchema.index({ recipient: 1, isRead: 1 });

export default mongoose.model("Notification", medicalNotificationSchema);