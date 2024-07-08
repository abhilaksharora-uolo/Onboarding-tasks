import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword: string;
  id: string;
  imageName: string;
  imageUrl?: string;
  isDeleted: boolean;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, message: "Name is required" },
  email: { type: String, required: true, message: "Email is required" },
  hashedPassword: {
    type: String,
    required: true,
    message: "Password is required",
  },
  imageName: { type: String, required: true, message: "Image is required" },
  imageUrl: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IUser>("user", UserSchema);
