import express from "express";
import {
  deleteUserController,
  singleUserController,
  getAllUserController,
  createUserController,
  updateUserController,
} from "../controllers/userController.js";

const router = express.Router();

// get all users
router.get("/", getAllUserController);

// create user
router.post("/", createUserController);

// update user
router.put("/:id", updateUserController);

// single user by ID
router.get("/:id", singleUserController);

// DELETE user by ID
router.delete("/:id", deleteUserController);

export default router;
