// server/models/Chat.ts

import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
  sender: string;
  receiver: string;
  message: string;
}

const ChatSchema: Schema = new Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
const Chat = mongoose.model<IChat>("Chat", ChatSchema);
export default Chat;
