
import mongoose from "mongoose";

const SeriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trailerId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    thumbnailId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Series", SeriesSchema);
