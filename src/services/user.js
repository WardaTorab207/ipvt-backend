import user from "../models/user.js";
import mongoose from "mongoose";

const UserService = {
  get: async (query) => {
    return user.find(query);
  },
  getById: async (id) => {
    return user.findById(id);
  },
  create: async (data) => {
    return user.create(data);
  },
  update: async ({ id, ...rest }) => {
    return user.findByIdAndUpdate(id, rest);
  },
  delete: async (id) => {
    return user.findByIdAndDelete(id);
  },
  login: async (credentials) => {
    const { email, password } = credentials;
    return user.findOne({ email, password });
  },
  getStreamOfUsersById: async (userId) => {
    return user.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "streams",
          localField: "_id",
          foreignField: "userId",
          as: "userStreams",
        },
      },
    ]);
  },
  getEpisodesByUserId: async (userId) => {
    return user.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "streams",
          localField: "_id",
          foreignField: "userId",
          as: "userStreams",
        },
      },
      { $unwind: "$userStreams" },
      {
        $lookup: {
          from: "episodes",
          localField: "userStreams.episodeId",
          foreignField: "_id",
          as: "episode",
        },
      },
    ]);
  },
};

export default UserService;
