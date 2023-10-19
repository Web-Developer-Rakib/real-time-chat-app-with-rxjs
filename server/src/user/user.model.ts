import mongoose, { Document, Schema } from "mongoose";
// Create a TypeScript interface for the user document
export interface IUser extends Document {
  username: string;
  password: string;
  status: string;
}
// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Offline",
  },
});

// Create the Mongoose model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
