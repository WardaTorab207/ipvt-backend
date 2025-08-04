import e from "express";
import StreamService from "../services/stream.js";

const StreamController = {
  get: async (req, res) => {
    try {
      const streams = await StreamService.get(req.query);
      res.status(200).json(streams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getbyId: async (req, res) => {
    try {
      const stream = await StreamService.getById(req.params.id);
      if (!stream) {
        return res.status(404).json({ error: "Stream not found" });
      }
      res.status(200).json(stream);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const stream = await StreamService.create(req.body);
      res.status(201).json(stream);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const stream = await StreamService.update(req.body);
      if (!stream) {
        return res.status(404).json({ error: "Stream not found" });
      }
      res.status(200).json(stream);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const stream = await StreamService.delete(req.params.id);
      if (!stream) {
        return res.status(404).json({ error: "Stream not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getEpisodeByStreamId: async (req, res) => {
    try {
      const episode = await StreamService.getEpisodeByStreamId(req.params.id);
      res.status(200).json(episode);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getUsersByStreamId: async (req, res) => {
    try {
      const user = await StreamService.getUsersByStreamId(req.params.id);
      if (!user || user.length === 0) {
        return res.status(404).json({ error: "User not found for this stream" });
      }
      res.status(200).json(user[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getSeasonOfEpisodeByStreamId: async (req, res) => {
    try {
      const season = await StreamService.getSeasonOfEpisodeByStreamId(req.params.id);
      if (!season || season.length === 0) {
        return res.status(404).json({ error: "Season not found for this stream" });
      }
      res.status(200).json(season[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
    getSeriesBySeasonOfEpisodeByStreamId: async (req, res) => {
try {
      const genres = await StreamService.getSeriesOfSeasonOfEpisodeByStreamId(req.params.id);
      if (!genres || genres.length === 0) {
        return res.status(404).json({ error: "Genres not found for this stream" });
      }
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    },
  getGenresByStreamId: async (req, res) => {
    try {
      const genres = await StreamService.getGenreOfSeriesOfSeasonOfEpisodeByStreamId(req.params.id);
      if (!genres || genres.length === 0) {
        return res.status(404).json({ error: "Genres not found for this stream" });
      }
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default StreamController;