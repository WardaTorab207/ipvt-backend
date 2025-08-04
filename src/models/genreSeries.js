import mongoose from "mongoose";

const genreSeriesSchema = new mongoose.Schema(
  {
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true
    },
    seriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("GenreSeries", genreSeriesSchema);
