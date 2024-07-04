import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import {
  addUserService,
  deleteUserService,
  getUserService,
} from "../services/userService";

export const addUser = (req: Request, res: Response) => {
  try {
    const data = addUserService(req.body);
    if (data.ok) {
      res.status(201).json({ message: "User added successfully", data });
    } else {
      res.status(404).json({ message: "All fields are required", data });
    }
  } catch (err) {
    throw err;
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = getUserService(req.query);
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
    const data = deleteUserService({id:req.params.id});
    if (data.ok) {
      res.status(201).json({ data, message: "User Deleted Successfully" });
    } else {
      res.status(404).json({ message: "User does not exists" });
    }
  } catch (err) {
    throw err;
  }
};
