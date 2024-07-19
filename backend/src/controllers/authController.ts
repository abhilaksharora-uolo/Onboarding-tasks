import { Request, Response } from "express";
import { IUser } from "../model/userModel";
import {
  getLoggedUserService,
  loginUserService,
} from "../services/authService";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(404).json({ message: "All fields are required" });
      return;
    }
    const data = await loginUserService(email, password);
    if (data.ok) {
      res.cookie("token", data.token, {
        sameSite: "strict",
        path: "/",
      });
      res.status(201).json({ data, message: data.message });
    } else {
      res.status(404).json({ message: data.message });
    }
  } catch (err) {
    throw err;
  }
};

export const loggedUser = async (req: Request, res: Response) => {
  try {
    const user = (req as Request & { user: IUser }).user;
    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const data = await getLoggedUserService(user);
    res.json({ message: "User data retrieved successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
