import GenreService from "../services/genre.js";

const GenreController = {
  get: async (req, res) => {
    try {
      const genres = await GenreService.get(req.query);
      res.json(genres);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      const genre = await GenreService.getById(req.params.id);
      res.json(genre);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const result = await GenreService.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const result = await GenreService.update({ id: req.params.id, ...req.body });
      res.status(200).json(result);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const result = await GenreService.delete(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  getAllSeriesByGenreId: async (req, res) => {
    try {
      const series = await GenreService.getAllSeriesByGenreId(req.params.id);
      res.json(series);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
    getAllSeasonsByGenreId: async (req, res) => {
        try {
        const episodes = await GenreService.getAllSeasonsByGenreId(req.params.id);
        res.json(episodes);
        } catch (err) {
        res.json({ message: err.message });
        }
    }
    };

export default GenreController;