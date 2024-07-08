import { getObjectSignedUrl, uploadFile } from "../config/aws";
import userModel from "../model/userModel";
import bcrypt from "bcryptjs";

interface User {
  name: string;
  email: string;
  hashedPassword: string;
  id: string;
  imageName: string;
  imageUrl?: string;
}

interface GetPageQuery {
  page?: number;
  limit?: number;
}

interface DeleteUserParams {
  id: string;
}

export const addUserService = async (
  name: string,
  email: string,
  password: string,
  file: Express.Multer.File
) => {
  try {
    const userFind = await userModel.findOne({ email });
    if (userFind && !userFind.isDeleted) {
      return { ok: true, message: { message: "User already exists" } };
    }
    if (userFind?.isDeleted) {
      const imageName = Date.now().toString();
      if (file) {
        await uploadFile(file.buffer, imageName, file.mimetype);
      }
      const hashedPassword = await bcrypt.hash(password, 8);
      const userUpdated = await userModel.findByIdAndUpdate(userFind.id, {
        name,
        email,
        hashedPassword,
        imageName,
        isDeleted: false,
      });
      return { ok: true, userUpdated };
    }
    const imageName = Date.now().toString();
    if (file) {
      await uploadFile(file.buffer, imageName, file.mimetype);
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await userModel.create({
      name,
      email,
      hashedPassword,
      imageName,
    });
    return { ok: true, user };
  } catch (err) {
    return { ok: false, message: { message: (err as Error).message } };
  }
};

export const getUserService = async (query: GetPageQuery) => {
  try {
    const page: number = Number(query.page) || 1;
    const limit: number = Number(query.limit) || 8;
    const startIndex: number = (page - 1) * limit;
    const len = await userModel.collection.countDocuments();
    const totalPages: number = Math.ceil(len / limit);
    const res = await userModel
      .find({ isDeleted: false })
      .skip(startIndex)
      .limit(limit);

    for (const u of res) {
      u.imageUrl = await getObjectSignedUrl(u.imageName);
    }

    return {
      ok: true,
      res,
      totalPages,
      message:
        res.length <= 0 ? "No users found" : "Users fetched successfully",
    };
  } catch (err) {
    return { ok: false, err: { message: (err as Error).message } };
  }
};

export const deleteUserService = async (params: DeleteUserParams) => {
  const id: string = params.id;
  const user = await userModel.findByIdAndUpdate(id, { isDeleted: true });
  if (!user) {
    return {
      ok: true,
      message: "User does not exists",
    };
  }
  return {
    ok: true,
    message: "User deleted successfully",
  };
};
