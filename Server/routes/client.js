import express from "express";
import {
  register,
  login,
  getClient,
  getClients,
  updateClient,
  deleteClient,
  verifyClient,
  getClientNames,
} from "../controllers/client.js";

import verifyToken from "../middlewares/verifyToken.js";
import VerifyClient from "../middlewares/verifyClient.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", verifyToken, verifyAdmin, getClients);
router.get("/client", verifyToken, VerifyClient, getClient);
router.put("/update", verifyToken, VerifyClient, updateClient);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteClient);
router.put("/verify/:id", verifyToken, verifyAdmin, verifyClient);
router.get("/names", getClientNames);

export default router;
