import UserService from "../services/user.js";

const UserController = {
  get: async (req, res) => {
    try {
      const users = await UserService.get(req.query);
      res.json(users);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      const user = await UserService.getById(req.params.id);
      res.json(user);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  getStreamOfUsersById: async (req, res) => {
    try {
      const userStreams = await UserService.getStreamOfUsersById(req.params.id);
      res.json(userStreams);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  getEpisodesByUserId: async (req, res) => {
    try {
      const episodes = await UserService.getEpisodesByUserId(req.params.id);
      res.json(episodes);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const result = await UserService.create(req.body);
      res.status(201).json({ message: "User registered", result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const result = await UserService.update({
        id: req.params.id,
        ...req.body,
      });
      res.status(200).json(result);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const result = await UserService.delete(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { token, userdata } = await UserService.login(req.body);
      res.status(200).json({
        message: "Login successful",
        token,
        data: {
         userdata
        },
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

export default UserController;
