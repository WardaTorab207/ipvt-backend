import series from "../models/series.js";
import mongoose from "mongoose";

const SeriesService = {
  get: async (query) => {
    const filter = {};
    const sort = {};
    const select = {};
    const limit = parseInt(query.limit) || 10;
    const skip = parseInt(query.skip) || 0;

    Object.keys(query).forEach((key) => {
      if (key === "sort") {
        if (typeof query.sort === "object") {
          query.sort.forEach((sortValue) => {
            sort[sortValue.replace("-", "")] = sortValue.startsWith("-")
              ? -1
              : 1;
          });
        } else {
          sort[query.sort.replace("-", "")] = query.sort.startsWith("-")
            ? -1
            : 1;
        }
      } else if (key === "select") {
        if (typeof query.select === "object") {
          query.select.forEach((selectValue) => {
            select[selectValue.replace("-", "")] = selectValue.startsWith("-")
              ? 0
              : 1;
          });
        } else {
          select[query.select.replace("-", "")] = query.select.startsWith("-")
            ? 0
            : 1;
        }
      } else if (key === "search") {
        if (typeof query.search === "object") {
          filter.$or = query.search.map((searchValue) => {
            return {
              name: {
                $regex: searchValue,
                $options: "i",
              },
            };
          });
        } else {
          filter.name = {
            $regex: query.search,
            $options: "i",
          };
        }
      } else {
        if (typeof query[key] === "object") {
          objectKeys(query[key]).forEach((operator) => {
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
    return series.find(filter).sort(sort).select(select).limit(limit).skip(skip);
  },
  getById: async (id) => {
    return series.findById(id);
  },
  create: async (data) => {
    return series.create(data);
  },
  update: async ({ id, ...rest }) => {
    return series.findByIdAndUpdate(id, rest);
  },
  delete: async (id) => {
    return series.findByIdAndDelete(id);
  },
  getAllSeasonsBySeriesId: async (seriesId) => {
    return series.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(seriesId) },
      },
      {
        $lookup: {
          from: "seasons",
          localField: "_id",
          foreignField: "seriesId",
          as: "seasonDetails",
        },
      },
    ]);
  },
  getAllEpisodesBySeriesId: async (seriesId) => {
    return series.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(seriesId) },
      },
      {
        $lookup: {
          from: "seasons",
          localField: "_id",
          foreignField: "seriesId",
          as: "seasons",
        },
      },
      { $unwind: "$seasons" },
      {
        $lookup: {
          from: "episodes",
          localField: "seasons._id",
          foreignField: "seasonId",
          as: "episodes",
        },
      },
    ]);
  },
};

export default SeriesService;
