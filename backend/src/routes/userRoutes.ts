import express, { Router } from "express";
import {
  addUser,
  deleteFromElastic,
  deleteUser,
  getUsers,
  loginUser,
} from "../controllers/userController";
import multer from "multer";

const router: Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/user", getUsers);
router.post("/user", upload.single("file"), addUser);
router.delete("/user/:id", deleteUser);
router.delete("/delete/:id", deleteFromElastic);
router.post("/login", loginUser)

export default router;
