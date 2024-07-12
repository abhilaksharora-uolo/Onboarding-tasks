import express, { Router } from "express";
import {
  addUser,
  deleteFromElastic,
  deleteUser,
  getUsers,
} from "../controllers/userController";
import multer from "multer";

const router: Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/user", getUsers);
router.post("/user", upload.single("file"), addUser);
router.delete("/user/:id", deleteUser);
// router.get("/user/search", searchUser);
router.delete("/delete/:id", deleteFromElastic);

export default router;
