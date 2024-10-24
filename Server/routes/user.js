import express from "express";
import {
  register,
  login,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  updatePassword,
  sendCode,
  resetPassword,
} from "../controllers/user.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", verifyToken, verifyAdmin, getUsers);
router.get("/user", verifyToken, getUser);
router.put("/update", verifyToken, updateUser);
router.put("/update-password", verifyToken, updatePassword);
router.post("/send-code", sendCode);
router.post("/reset-password", resetPassword);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
