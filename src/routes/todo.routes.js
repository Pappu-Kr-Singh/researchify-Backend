import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getAllTodoById,
  updateTodo,
} from "../controllers/todo.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

// router.post("/", createTodo);
router.route("/").get(getAllTodo).post(createTodo);
router.get("/:userId", getAllTodoById);
router.route("/:todoId").delete(deleteTodo).patch(updateTodo);

export default router;
