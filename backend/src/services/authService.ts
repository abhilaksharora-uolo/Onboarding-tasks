import { getObjectSignedUrl } from "../controllers/imageController";
import { searchUserByEmailHandler } from "../utils/dbHandler";
import { signJWT } from "../utils/jwtOperations";
import bcrypt from "bcryptjs";

export const loginUserService = async (email: string, password: string) => {
  try {
    const body = await searchUserByEmailHandler(email);
    if (body === null) {
      return {
        ok: false,
        message: "User does not exists",
      };
    }

    const hashedPassword1 = body?.hashedPassword;

    if (!hashedPassword1) {
      return {
        ok: false,
        message: "Password is not available",
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword1);

    if (!isPasswordCorrect) {
      return {
        ok: false,
        message: "Invalid Credentials",
      };
    }

    const token = signJWT(body.email, body._id as string);

    const user = {
      name: body.name,
      imageUrl: await getObjectSignedUrl(body.imageName),
    };

    return {
      ok: true,
      token,
      user,
      message: "User logged in",
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getLoggedUserService = async (res: any) => {
  try {
    res.imageUrl = await getObjectSignedUrl(res.imageName);
    return {
      ok: true,
      res,
      message: "User fetched successfully",
    };
  } catch {}
};
