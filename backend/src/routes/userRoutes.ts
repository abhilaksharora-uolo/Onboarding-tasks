import express, { Router } from "express";
import {
  addUser,
  deleteFromElastic,
  deleteUser,
  getUsers,
} from "../controllers/userController";
import multer from "multer";
import { checkUserAuth } from "../middleware/auth";
import { loggedUser, loginUser } from "../controllers/authController";

const router: Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/user/login", loginUser);
router.delete("/delete/:id", deleteFromElastic);

router.use(checkUserAuth);
router.get("/user", getUsers);
router.post("/user", upload.single("file"), addUser);
router.delete("/user/:id", deleteUser);
router.get("/user/logged", loggedUser);

export default router;
