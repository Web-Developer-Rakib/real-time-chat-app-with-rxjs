import { Request, Response } from "express";
import { io } from "../..";
import Chat from "./chat.model";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { sender, receiver, message } = req.body;
    const newChat = new Chat({ sender, receiver, message });
    const savedChat = await newChat.save();
    io.emit("message", savedChat);
    res.json(savedChat);
  } catch (error) {
    res.status(500).json({ error: "Failed to send the message." });
  }
};
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await Chat.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages." });
  }
};
