import SeriesService from "../services/series.js";

const SeriesController = {
  get: async (req, res) => {
    try {
      const series = await SeriesService.get(req.query);
      res.status(200).json(series);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const series = await SeriesService.getById(req.params.id);
      if (!series) {
        return res.status(404).json({ message: "Series not found" });
      }
      res.status(200).json(series);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const series = await SeriesService.create(req.body);
      res.status(201).json(series);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const series = await SeriesService.update({
        id: req.params.id,
        ...req.body,
      });
      if (!series) {
        return res.status(404).json({ message: "Series not found" });
      }
      res.status(200).json(series);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const series = await SeriesService.delete(req.params.id);
      if (!series) {
        return res.status(404).json({ message: "Series not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllSeasonsBySeriesId: async (req, res) => {
    try {
      const seasons = await SeriesService.getAllSeasonsBySeriesId(
        req.params.id
      );
      res.status(200).json(seasons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllEpisodesBySeriesId: async (req, res) => {
    try {
      const episodes = await SeriesService.getAllEpisodesBySeriesId(
        req.params.id
      );
      res.status(200).json(episodes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default SeriesController;
