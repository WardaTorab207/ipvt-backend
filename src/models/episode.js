import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seasonId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Season",
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

export default mongoose.model("Episode", episodeSchema);
