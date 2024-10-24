import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    data: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "reviewed"],
      default: "pending",
    },
    flaggedItems: [
      {
        type: String,
      },
    ],
    media: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Assessment =
  mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);

export default Assessment;
