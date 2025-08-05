import file from "../models/file.js";
import FileService from "../services/file.js";

const FileController = {
  get: async (req, res) => {
    try {
      const files = await FileService.get(req.query);
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const file = await FileService.getById(req.params.id);
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      res.status(200).json(file);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const file = await FileService.create(req.body);
      res.status(201).json(file);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const file = await FileService.update({ id: req.params.id, ...req.body });
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      res.status(200).json(file);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const file = await FileService.delete(req.params.id);
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  uploadFile :async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        response: "Bad Request",
        message: "No file uploaded",
      });
    }

    const newFile = new file({
      originalName: req.file.originalname,
      currentName: req.file.filename,
      type: req.file.mimetype,
      path: req.file.path,
      size: `${(req.file.size / 1024).toFixed(2)} KB`,
    });

    const savedFile = await newFile.save();

    res.status(201).json({
      status: 201,
      response: "Created",
      message: "File uploaded successfully",
      data: savedFile,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      status: 500,
      response: "Internal Server Error",
      message: "Failed to upload file",
    });
  }}};

export default FileController;