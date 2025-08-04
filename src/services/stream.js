import streams from "../models/stream.js";
import mongoose from "mongoose";

const StreamService = {
  get: async (query) => {
    const filter = {};
    const sort = {};
    const select = {};
    const limit = parseInt(query.limit) || 10;
    const skip = parseInt(query.skip) || 0;

    Object.keys(query).forEach((key) => {
      if (key === "sort") {
        const sortValues = Array.isArray(query.sort)
          ? query.sort
          : query.sort.split(",");
        sortValues.forEach((sortValue) => {
          sort[sortValue.replace("-", "")] = sortValue.startsWith("-") ? -1 : 1;
        });
      } else if (key === "select") {
        const selectValues = Array.isArray(query.select)
          ? query.select
          : query.select.split(",");
        selectValues.forEach((selectValue) => {
          select[selectValue.replace("-", "")] = selectValue.startsWith("-")
            ? 0
            : 1;
        });
      } else if (key === "search") {
        const searchFields = ["time"]; // change to relevant fields in your model
        filter.$or = searchFields.map((field) => ({
          [field]: { $regex: query.search, $options: "i" },
        }));
      } else if (!["limit", "skip"].includes(key)) {
        if (typeof query[key] === "object") {
          Object.keys(query[key]).forEach((operator) => {
            filter[key] = {
              ...filter[key],
              [`$${operator}`]: query[key][operator],
            };
          });
        } else {
          filter[key] = query[key];
        }
      }
    });

    return streams
      .find(filter)
      .sort(sort)
      .select(select)
      .limit(limit)
      .skip(skip);
  },

  getById: async (id) => {
    return streams.findById(id);
  },
  create: async (data) => {
    return streams.create(data);
  },
  update: async ({ id, ...rest }) => {
    return streams.findByIdAndUpdate(id, rest);
  },
  delete: async (id) => {
    return streams.findByIdAndDelete(id);
  },
  getEpisodeByStreamId: async (streamId) => {
    return streams.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(streamId) },
      },
      {
        $lookup: {
          from: "episodes",
          let: { episodeIds: "$episodeId" }, // 👈 episodeId is array
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$episodeIds"], // 👈 match if _id in episodeId array
                },
              },
            },
          ],
          as: "episodeDetails",
        },
      },
    ]);
  },
  getUsersByStreamId: async (streamId) => {
    return streams.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(streamId) },
      },
      {
        $unwind: "$userId", // 👈 Unwind the array
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
    ]);
  },
  getSeasonOfEpisodeByStreamId: async (streamId) => {
    return streams.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(streamId) },
      },
      {
        $lookup: {
          from: "episodes",
          localField: "episodeId",
          foreignField: "_id",
          as: "episodeDetails",
        },
      },
      { $unwind: "$episodeDetails" },
      {
        $lookup: {
          from: "seasons",
          localField: "episodeDetails.seasonId",
          foreignField: "_id",
          as: "seasonDetails",
        },
      },
    ]);
  },
  getSeriesOfSeasonOfEpisodeByStreamId: async (streamId) => {
    return streams.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(streamId) },
      },
      {
        $lookup: {
          from: "episodes",
          localField: "episodeId",
          foreignField: "_id",
          as: "episodeDetails",
        },
      },
      { $unwind: "$episodeDetails" },
      {
        $lookup: {
          from: "seasons",
          localField: "episodeDetails.seasonId",
          foreignField: "_id",
          as: "seasonDetails",
        },
      },
      { $unwind: "$seasonDetails" },
      {
        $lookup: {
          from: "series",
          localField: "seasonDetails.seriesId",
          foreignField: "_id",
          as: "seriesDetails",
        },
      },
    ]);
  },
  getGenreOfSeriesOfSeasonOfEpisodeByStreamId: async (streamId) => {
    return streams.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(streamId) },
      },
      {
        $lookup: {
          from: "episodes",
          localField: "episodeId",
          foreignField: "_id",
          as: "episodeDetails",
        },
      },
      { $unwind: "$episodeDetails" },
      {
        $lookup: {
          from: "seasons",
          localField: "episodeDetails.seasonId",
          foreignField: "_id",
          as: "seasonDetails",
        },
      },
      { $unwind: "$seasonDetails" },
      {
        $lookup: {
          from: "series",
          localField: "seasonDetails.seriesId",
          foreignField: "_id",
          as: "seriesDetails",
        },
      },
      { $unwind: "$seriesDetails" },
      {
        $lookup: {
          from: "genreSeries",
          localField: "seriesDetails._id",
          foreignField: "seriesId",
          as: "genreSeriesList",
        },
      },
      { $unwind: "$genreSeriesList" },
      {
        $lookup: {
          from: "genres",
          localField: "genreSeriesList.genreId",
          foreignField: "_id",
          as: "genreDetails",
        },
      },
    ]);
  },
};

export default StreamService;
