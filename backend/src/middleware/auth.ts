import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../model/userModel";
import userModel from "../model/userModel";
import "dotenv/config";
import { verifyJWT } from "../utils/jwtOperations";

interface DecodedToken extends JwtPayload {
  id: string;
}

export const checkUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;
  const { authorization } = req.headers;

  if (authorization) {
    try {
      token = authorization;
      token = authorization.split(" ")[1];

      const decodedToken = verifyJWT(token) as DecodedToken;

      const { id } = decodedToken;
      const user = await userModel.findById(id).select("-hashedPassword");
      if (user) {
        (req as Request & { user: IUser }).user = user;
        next();
      } else {
        res.status(401).send({ status: "failed", message: "User not found" });
      }
    } catch (error) {
      console.error("JWT Verification Error:", error);
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  }

  if (!token) {
    res
      .status(401)
      .send({ status: "failed", message: "Login to Access this resource" });
  }
};
