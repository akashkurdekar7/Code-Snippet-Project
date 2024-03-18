import express from "express";
import {
  deleteUserController,
  singleUserController,
  allUserController,
  createAndUpdateUserController,
} from "../controllers/userController.js";

const router = express.Router();

// get all users
router.get("/", allUserController);

// create users
router.post("/", createAndUpdateUserController);
router.put("/", createAndUpdateUserController);

// single user by ID
router.get("/:id", singleUserController);

// DELETE user by ID
router.delete("/:id", deleteUserController);

export default router;
