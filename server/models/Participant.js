import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
    baselineScore: { type: Number, required: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "COMPLETED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Participant", participantSchema);
