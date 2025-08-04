import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seriesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Series",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Season", seasonSchema);
