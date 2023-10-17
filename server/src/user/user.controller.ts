import { Request, Response } from "express";
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
    const user = await User.findOne({ username, password });

    if (user) {
      const usersInfo = {
        username: user.username,
        id: user._id,
      };
      res.status(200).json({ message: "Login successful", usersInfo });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllfriends = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.query.username;
    console.log(loggedInUser);
    const allUsers = await User.find({
      username: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
