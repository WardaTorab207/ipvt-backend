// genreSeriesController.js
import genreSeriesService from "../services/genreSeries.js";  // ✅ Import the service

const genreSeriesController = {
  assignGenreToSeries: async (req, res) => {
    try {
      const { genreId, seriesId } = req.body;

      const data = await genreSeriesService.addGenreToSeries(genreId, seriesId);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getGenresBySeries: async (req, res) => {
    try {
      const { seriesId } = req.params;

      const data = await genreSeriesService.getGenresBySeries(seriesId);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getSeriesByGenre: async (req, res) => {
    try {
      const { genreId } = req.params;

      const data = await genreSeriesService.getSeriesByGenre(genreId);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export default genreSeriesController;
