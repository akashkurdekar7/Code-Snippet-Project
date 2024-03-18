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
router.post("/create", createUserController);

// update user
router.put("/update/:id", updateUserController);

// single user by ID
router.get("/user/:id", singleUserController);

// DELETE user by ID
router.delete("/delete/:id", deleteUserController);

export default router;
