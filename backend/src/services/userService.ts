import { getObjectSignedUrl, uploadFile } from "../controllers/imageController";
import bcrypt from "bcryptjs";
import {
  createNewUserHandler,
  deleteUserHandler,
  searchUserByEmailHandler,
  updateUserHandler,
} from "../utils/dbHandler";
import {
  createIndexHandler,
  deleteUserElasticHandler,
  getAllUsersHandler,
  searchByEmailHandler,
  searchByIdHandler,
  userUpdateElasticHandler,
} from "../utils/elasticHandler";
import { searchById } from "../utils/elasticOperations";
import { client } from "../config/initializeElasticsearch";
import "dotenv/config";
import { signJWT } from "../utils/jwtOperations";

interface UserHit {
  isDeleted: boolean;
  _id: string;
  imageUrl: string;
  imageName: string;
  _source: {
    name: string;
    email: string;
    hashedPassword: string;
    imageName: string;
    mongoId: string;
    isDeleted?: boolean;
    updatedAt: Date;
  };
}

interface GetPageQuery {
  page?: number;
  limit?: number;
  q?: string;
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
    const body = await searchByEmailHandler(email);
    if (body?.existingUserActive) {
      return {
        ok: false,
        message: "User with this email already exists and is active.",
      };
    } else if (!body?.existingUserActive && body?.isDeleted) {
      const imageName = Date.now().toString();
      if (file) {
        await uploadFile(
          file.buffer,
          `${imageName}${file.originalname}`,
          file.mimetype
        );
      }
      const img = `${imageName}${file.originalname}`;
      const hashedPassword = await bcrypt.hash(password, 8);

      await userUpdateElasticHandler(
        body.elasticId,
        name,
        email,
        hashedPassword,
        img
      );

      const userUpdated = await updateUserHandler(
        body.mongoId,
        name,
        email,
        hashedPassword,
        img
      );
      return { ok: true, userUpdated };
    }
    const imageName = Date.now().toString();
    if (file) {
      await uploadFile(
        file.buffer,
        `${imageName}${file.originalname}`,
        file.mimetype
      );
    }
    const img = `${imageName}${file.originalname}`;
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await createNewUserHandler(name, email, hashedPassword, img);

    if (user && user._id && user.updatedAt) {
      const mongoId = user._id.toString();
      const updatedAt = user.updatedAt;

      const body = await createIndexHandler(
        name,
        email,
        hashedPassword,
        img,
        mongoId,
        updatedAt
      );
    }
    return { ok: true, user };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
};

export const getUserService = async (query: GetPageQuery) => {
  try {
    const page: number = Number(query.page) || 1;
    const limit: number = Number(query.limit) || 8;
    const searchQuery = (query.q as string) || "";

    const body: any = await getAllUsersHandler(searchQuery, page, limit);
    if (body.userCount === 0) {
      return { ok: true, res: [], message: "No users found" };
    }

    const totalPages: number = Math.ceil(body.userCount / limit);

    const res = body.body.hits.hits.map((hit: any) => ({
      _id: hit._id,
      ...hit._source,
    }));

    for (const user of res) {
      user.imageUrl = await getObjectSignedUrl(user.imageName);
    }

    return {
      ok: true,
      res,
      totalPages,
      message: "Users fetched successfully",
    };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
};

export const deleteUserService = async (params: DeleteUserParams) => {
  const id: string = params.id;

  const userHit = await searchById(id);

  if (!userHit) {
    return {
      ok: false,
      message: "User does not exist",
    };
  }

  const elasticId = userHit._id;

  if (elasticId) {
    await deleteUserElasticHandler(elasticId);
  }

  const user = await deleteUserHandler(id);

  if (!user) {
    return {
      ok: false,
      message: "User does not exist",
    };
  }

  return {
    ok: true,
    message: "User deleted successfully",
  };
};

export const loginUserService = async (email: string, password: string) => {
  try {
    const body = await searchUserByEmailHandler(email);
    if (body === null) {
      return {
        ok: false,
        message: "User does not exists",
      };
    }

    const hashedPassword = body?.hashedPassword;

    if (!hashedPassword) {
      return {
        ok: false,
        message: "Password is not available",
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      return {
        ok: false,
        message: "Incorrect Credentials",
      };
    }

    const token = signJWT(body.email, body._id as string);

    return {
      ok: true,
      token,
      message: "User logged in",
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteUserFromElastic = async (params: DeleteUserParams) => {
  const id: string = params.id;
  try {
    const body = await client.delete({
      index: "abhilaksh_users3",
      id: id,
    });
    return {
      ok: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLoggedUserService = async (res: any) => {
  try {
    console.log(res, "RESSS");
    res.imageUrl = await getObjectSignedUrl(res.imageName);
    console.log(res, "RES");
    return {
      ok: true,
      res,
      message: "User fetched successfully",
    };
  } catch {}
};
