import express from "express";
import {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// http://localhost:3000/api/user
router.post("/user", addUser);

// http://localhost:3000/api/users
router.get("/users", getAllUsers);

// http://localhost:3000/api/user/user
router.get("/user/:id", getUser);

// http://localhost:3000/api/user/user
router.put("/user/:id", updateUser);

// http://localhost:3000/api/user/user
router.delete("/user/:id", deleteUser);

export default {
  routes: router,
};
