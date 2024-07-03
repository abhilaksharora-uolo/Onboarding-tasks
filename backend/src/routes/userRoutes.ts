import express, { Request, Response, Router } from "express";
import { addUser, deleteUser, getUsers } from "../controllers/userController";

const router: Router = express.Router();

router.get("/user", getUsers);
router.post("/user", addUser);
router.delete("/user/:id", deleteUser);

export default router;
