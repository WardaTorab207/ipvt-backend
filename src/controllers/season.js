import SeasonService from "../services/season.js";

const SeasonController = {
  get: async (req, res) => {
    try {
      const seasons = await SeasonService.get(req.query);
      res.status(200).json(seasons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const season = await SeasonService.getById(req.params.id);
      if (!season) {
        return res.status(404).json({ message: "Season not found" });
      }
      res.status(200).json(season);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const newSeason = await SeasonService.create(req.body);
      res.status(201).json(newSeason);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const updatedSeason = await SeasonService.update({
        id: req.params.id,
        ...req.body,
      });
      if (!updatedSeason) {
        return res.status(404).json({ message: "Season not found" });
      }
      res.status(200).json(updatedSeason);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const deletedSeason = await SeasonService.delete(req.params.id);
      if (!deletedSeason) {
        return res.status(404).json({ message: "Season not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllEpisodesBySeasonId: async (req, res) => {
    try {
      const episodes = await SeasonService.getAllEpisodesBySeasonId(
        req.params.id
      );
      if (!episodes) {
        return res
          .status(404)
          .json({ message: "Season not found or has no episodes" });
      }
      res.status(200).json(episodes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
export default SeasonController;
