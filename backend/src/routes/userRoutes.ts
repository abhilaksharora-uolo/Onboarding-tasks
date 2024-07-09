import express, { Request, Response, Router } from "express";
import { addUser, deleteUser, getUsers } from "../controllers/userController";
import multer from "multer";

const router: Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/user", getUsers);
router.post("/user", upload.single("file"), addUser);
router.delete("/user/:id", deleteUser);

export default router;
