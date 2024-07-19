import { Request, Response } from "express";
import {
  addUserService,
  deleteUserFromElastic,
  deleteUserService,
  getLoggedUserService,
  getUserService,
  loginUserService,
} from "../services/userService";
import { IUser } from "../model/userModel";

interface DataObject {
  ok: boolean;
  user?: IUser;
  message?: string;
  error?: string;
}

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!req.file) return;
    const file: Express.Multer.File = req.file;
    if (!(name && email && password && file)) {
      res.status(404).json({ message: "All fields are required" });
      return;
    }
    const data: DataObject = await addUserService(name, email, password, file);
    if (data.ok) {
      res.status(201).json({ message: "User added successfully", data });
    } else {
      res.status(404).json({ message: "Error in adding user", data });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    throw err;
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await getUserService(req.query);
    console.log(data);
    if (data.ok) {
      res.status(201).json({ message: "Data fetched successfully", data });
    } else {
      res.status(404).json({ message: "Error in finding users", data });
    }
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const data = await deleteUserService({ id: req.params.id });
    if (data.ok) {
      res.status(201).json({ data, message: "User Deleted Successfully" });
    } else {
      res.status(404).json({ message: "User does not exists" });
    }
  } catch (err) {
    throw err;
  }
};

export const deleteFromElastic = async (req: Request, res: Response) => {
  try {
    const data = await deleteUserFromElastic({ id: req.params.id });
    if (data.ok) {
      res.status(201).json({ data, message: "User Deleted Successfully" });
    } else {
      res.status(404).json({ message: "User does not exists" });
    }
  } catch (err) {
    throw err;
  }
};

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
    console.log(data);
    res.json({ message: "User data retrieved successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
