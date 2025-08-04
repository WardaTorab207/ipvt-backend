import mongoose from "mongoose";

const streamSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
    episodeId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episode",
      },
    ],
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Stream", streamSchema);
