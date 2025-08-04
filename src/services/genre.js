import genre from "../models/genre.js";
import mongoose from "mongoose";

const GenreService = {
  get: async (query) => {
    return genre.find(query);
  },
  getById: async (id) => {  
    return genre.findById(id);
  },
  create: async (data) => {
    return genre.create(data);
  },
  update: async ({ id, ...rest }) => {
    return genre.findByIdAndUpdate(id, rest);
  },
  delete: async (id) => {
    return genre.findByIdAndDelete(id);
  },
  getAllSeriesByGenreId: async (genreId) => {
    return genre.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(genreId) },
      },
      {
        $lookup: {
          from: "genreseries",
          localField: "_id",
          foreignField: "genreId",
          as: "seriesIdList",
        },
      },
      { $unwind: "$seriesIdList" },
      {
        $lookup: {
          from: "series",
          localField: "seriesIdList.seriesId",
          foreignField: "_id",
          as: "seriesDetails",
        },
      },
      { $unwind: "$seriesDetails" },
      {
        $replaceRoot: { newRoot: "$seriesDetails" },
      },
    ]);
    },
    getAllSeasonsByGenreId: async (genreId) => {
    return genre.aggregate([
      {
        $lookup: {
          from: "genreseries",
          localField: "_id",
          foreignField: "genreId",
          as: "seriesIdList",
        },
      },
      { $unwind: "$seriesIdList" },
      {
        $lookup: {
          from: "series",
          localField: "seriesIdList.seriesId",
          foreignField: "_id",
          as: "seriesDetails",
        },
      },
      { $unwind: "$seriesDetails" },
      {
        $replaceRoot: { newRoot: "$seriesDetails" },
      },
      {
        $lookup: {
          from: "seasons",
          localField: "_id",
          foreignField: "seriesId",
          as: "seasonDetails",
        },
      }
    ]);
}};

export default GenreService;