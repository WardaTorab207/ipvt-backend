import file from "../models/file.js";

const FileService = {
  get: async (query) => {
    return file.find(query);
  },
  getById: async (id) => {
    return file.findById(id);
  },
  create: async (data) => {
    return file.create(data);
  },
  update: async ({ id, ...rest }) => {
    return file.findByIdAndUpdate(id, rest);
  },
  delete: async (id) => {
    return file.findByIdAndDelete(id);
  },
};

export default FileService;
