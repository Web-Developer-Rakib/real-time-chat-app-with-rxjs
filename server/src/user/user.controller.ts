import { Request, Response } from "express";
import { io } from "../..";
import User from "./user.model";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already in use" });
    }
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username, password },
      { status: "Online" }
    );

    if (user) {
      const usersInfo = {
        username: user.username,
        id: user._id,
        status: "Online",
      };
      io.emit("status", usersInfo);
      res.status(200).json({ message: "Login successful", usersInfo });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { status: "Offline" }
    );
    if (user) {
      const usersInfo = {
        id: user._id,
        status: "Offline",
      };
      io.emit("status", usersInfo);
      res.status(200).json({ message: "Logout successful", usersInfo });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getSingleUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.sendStatus(404);
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllfriends = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.query.username;
    const allUsers = await User.find({
      username: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
