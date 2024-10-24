import express from "express";
import {
  createAdmin,
  loginAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  updatePassword,
} from "../controllers/admin.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, createAdmin);
router.post("/login", loginAdmin);
router.get("/", verifyToken, verifyAdmin, getAdmins);
router.get("/admin", verifyToken, verifyAdmin, getAdmin);
router.put("/:id", verifyToken, verifyAdmin, updateAdmin);
router.put("/:id/update-password", verifyToken, verifyAdmin, updatePassword);
router.delete("/:id", verifyToken, verifyAdmin, deleteAdmin);

export default router;
