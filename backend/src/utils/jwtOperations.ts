import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const signJWT = (email: string, id: string) => {
  return jwt.sign({ email: email, id: id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};
