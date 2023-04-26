import express from "express";
import authController from "../controller/authController";
const router = express.Router();

// Auth Routes
router.post("/login", authController.login);
router.get("/link/:id", authController.checkValidLink);
router.put("/user/:id", authController.updateUserName);
export default router;
