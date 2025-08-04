import genreSeries from "../models/genreSeries.js";

const genreSeriesService = {
  addGenreToSeries: async (genreId, seriesId) => {
    return await genreSeries.create({ genreId, seriesId });
  },
  getGenresBySeries: async (seriesId) => {
    return await genreSeries.find({ seriesId }).populate("genreId");
  },
  getSeriesByGenre: async (genreId) => {
    return await genreSeries.find({ genreId }).populate("seriesId");
  },
};

export default genreSeriesService;
