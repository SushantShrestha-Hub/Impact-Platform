import mongoose from "mongoose";

const outcomeRecordSchema = new mongoose.Schema(
  {
    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    currentScore: { type: Number, required: true },
    progressNotes: { type: String },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("OutcomeRecord", outcomeRecordSchema);
