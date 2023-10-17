import mongoose, { Document, Schema } from "mongoose";
// Create a TypeScript interface for the user document
export interface IUser extends Document {
  username: string;
  password: string;
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
});

// Create the Mongoose model
const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
