import mongoose from "mongoose";

const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    otherUrls: {
      type: Array,
      required: true,
    },
    projectVideoUrl: {
      type: String,
      required: true,
    },
    projectImageUrl: {
      type: String,
      required: true,
    },
    projectTags: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Portfolio", portfolioSchema);
