import EpisodeService from "../services/episode.js";
const EpisodeController = {
  get: async (req, res) => {
    try {
      const episodes = await EpisodeService.get(req.query);
      res.status(200).json(episodes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const episode = await EpisodeService.getById(req.params.id);
      if (!episode) {
        return res.status(404).json({ message: "Episode not found" });
      }
      res.status(200).json(episode);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const newEpisode = await EpisodeService.create(req.body);
      res.status(201).json(newEpisode);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => { 
    try {
      const updatedEpisode = await EpisodeService.update({
        id: req.params.id,
        ...req.body,
      });
      if (!updatedEpisode) {
        return res.status(404).json({ message: "Episode not found" });
      }
      res.status(200).json(updatedEpisode);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const deletedEpisode = await EpisodeService.delete(req.params.id);
      if (!deletedEpisode) {
        return res.status(404).json({ message: "Episode not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
    getAllStreamsByEpisodeId: async (req, res) => {
        try {
        const streams = await EpisodeService.getAllStreamsByEpisodeId(req.params.id);
        if (!streams) {
            return res.status(404).json({ message: "Streams not found for this episode" });
        }
        res.status(200).json(streams);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
};
export default EpisodeController;