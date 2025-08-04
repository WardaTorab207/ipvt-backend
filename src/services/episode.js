import episodes from "../models/episode.js";
import mongoose from "mongoose";

const EpisodeService = {
  get: async (query) => {
    return episodes.find(query);
  },
  getById: async (id) => {
    return episodes.findById(id);
  },
  create: async (data) => {
    return episodes.create(data);
  },
  update: async ({ id, ...rest }) => {
    return episodes.findByIdAndUpdate(id, rest);
  },
  delete: async (id) => {
    return episodes.findByIdAndDelete(id);
  },
  getAllStreamsByEpisodeId: async (episodeId) => {
    return episodes.aggregate([
      {
        $match:{_id : new mongoose.Types.ObjectId(episodeId)}
      },
      {
        $lookup :{
          from: "streams",
          localField: "_id",
          foreignField: "episodeId",
          as: "streamDetails",
        }
      },
    ]);
  }
};

export default EpisodeService;