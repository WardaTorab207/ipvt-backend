import mongoose from "mongoose";
import season from "../models/season.js";

const SeasonService = {
  get: async (query) => {
    return season.find(query);
  },
  getById: async (id) => {
    return season.findById(id);
  },
  create: async (data) => {
    return season.create(data);
  },
  update: async ({ id, ...rest }) => {
    return season.findByIdAndUpdate(id, rest);
  },
  delete: async (id) => {
    return season.findByIdAndDelete(id);
  },
  getAllEpisodesBySeasonId: async (seasonId) => {
      return season.aggregate([
          {
            $match: { _id: new mongoose.Types.ObjectId(seasonId) },
          },
          {
            $lookup: {
              from: "episodes",
              localField: "_id",
              foreignField: "seasonId",
              as: "episodeDetails",
            },
          },
        ]);
      },
};
export default SeasonService;