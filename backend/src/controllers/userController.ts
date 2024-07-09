import { Request, Response } from "express";
import {
  addUserService,
  deleteUserService,
  getUserService,
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
