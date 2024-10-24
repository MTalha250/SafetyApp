import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    fields: [
      {
        label: {
          type: String,
          required: true,
        },
        fieldType: {
          type: String,
          required: true,
          enum: [
            "text",
            "textarea",
            "number",
            "select",
            "checkbox",
            "radio",
            "file",
          ],
        },
        options: [
          {
            type: String,
          },
        ],
        required: {
          type: Boolean,
          default: false,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

const Template =
  mongoose.models.Template || mongoose.model("Template", templateSchema);

export default Template;
