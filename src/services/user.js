import user from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const UserService = {
  get: async (query) => {
    return user.find(query);
  },
  getById: async (id) => {
    return user.findById(id);
  },
  create: async (data) => {
    const { firstName,lastName,email, password } = data;
    const existing = await user.findOne({ email });
    if (existing) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await user.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return userData;
  },
  update: async ({ id, ...rest }) => {
    return user.findByIdAndUpdate(id, rest);
  },
  delete: async (id) => {
    return user.findByIdAndDelete(id);
  },
  login: async (credentials) => {
    try {
    const { email, password } = credentials;

    const userdata = await user.findOne({ email });

    if (!userdata) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, userdata.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { username: userdata.email },
      process.env.JWT_SECRET || "wardaSmartProjectKey!",
      { expiresIn: "1d" }
    );

    return { token, userdata };

  } catch (err) {
    console.error("Login error:", err.message);  // debug line
    throw err;
  }
},
  getStreamOfUsersById: async (userId) => {
    return user.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "streams",
          localField: "_id",
          foreignField: "userId",
          as: "userStreams",
        },
      },
    ]);
  },
  getEpisodesByUserId: async (userId) => {
    return user.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "streams",
          localField: "_id",
          foreignField: "userId",
          as: "userStreams",
        },
      },
      { $unwind: "$userStreams" },
      {
        $lookup: {
          from: "episodes",
          localField: "userStreams.episodeId",
          foreignField: "_id",
          as: "episode",
        },
      },
    ]);
  },
};

export default UserService;
