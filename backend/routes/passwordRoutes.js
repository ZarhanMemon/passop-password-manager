import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { addPassword, getPasswords, deletePassword , updatePassword } from "../controller/passwordController.js";

const router = express.Router();

// All routes are protected

router.get("/", protectRoute, getPasswords);

router.post("/add-password", protectRoute, addPassword);
router.delete("/delete-password/:id", protectRoute, deletePassword);

router.put("/update-password/:id", protectRoute , updatePassword)

export default router;
