import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword?: string;
  id: string;
  imageName: string;
  imageUrl?: string;
  isDeleted: boolean;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, message: "Name is required" },
  email: { type: String, required: true, message: "Email is required" },
  hashedPassword: {
    type: String,
    message: "Password is required",
  },
  imageName: { type: String, required: true, message: "Image is required" },
  imageUrl: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

UserSchema.set("timestamps", true);

export default mongoose.model<IUser>("users1", UserSchema);
