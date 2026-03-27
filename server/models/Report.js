import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    exportedAt: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("Report", reportSchema);
