import mongoose, { isValidObjectId } from "mongoose";
import { Todo } from "../models/todo.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllTodoById = asyncHandler(async (req, res) => {
  // Todo- Get all todo by userId
  const { userId } = req.params;
  // console.log(userId);
  // 667069c207c28a1763dc109c

  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "invalid UserId");
  }

  const todo = await Todo.find({ owner: userId });

  if (!todo.length) {
    throw new ApiError(401, "No post found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, todo, "All todo have been fetched successfully")
    );
});

const getAllTodo = asyncHandler(async (req, res) => {
  // Fetch all posts
  const todos = await Todo.find({});
  // console.log("Found todo: ", todos);

  if (!todos.length) {
    throw new ApiError(401, "No todos found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, todos, "All todos have been fetched successfully")
    );
});

const createTodo = asyncHandler(async (req, res) => {
  // Create post
  // console.log("Reached createTodo endpoint"); // Add this line for logging

  const { todoName, date } = req.body;

  if (!todoName || !date) {
    throw new ApiError(401, "todoName and date are required");
  }

  const todo = await Todo.create({
    todoName: todoName,
    date: date,
    owner: req.user._id,
  });

  if (!todo) {
    throw new ApiError(401, "Error while creating a todo");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, todo, "The todo has been created Successfully"));
});

// const updateTodo = asyncHandler(async (req, res) => {
//   // update post

//   const { todoId } = req.params;
//   const { title, date } = req.body;

//   if (!isValidObjectId(todoId)) {
//     throw new ApiError(401, "Invalid todoId");
//   }

//   const todo = await Todo.findByIdAndUpdate(
//     todoId,
//     {
//       title,
//       date: date,
//     },
//     {
//       new: true,
//     }
//   );

//   if (!todo) {
//     throw new ApiError(401, "Error while updating the todo");
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, todo, "Post has been updated successfully"));
// });

const updateTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  const { todoName, date, status } = req.body;

  if (!isValidObjectId(todoId)) {
    throw new ApiError(401, "Invalid todoId");
  }

  const todo = await Todo.findByIdAndUpdate(
    todoId,
    { todoName, date, status },
    { new: true }
  );

  if (!todo) {
    throw new ApiError(401, "Error while updating the todo");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo has been updated successfully"));
});

const deleteTodo = asyncHandler(async (req, res) => {
  // delete post
  const { todoId } = req.params;

  if (!isValidObjectId(todoId)) {
    throw new ApiError(401, "Invalid todoId");
  }

  const todo = await Todo.findByIdAndDelete(todoId);

  if (!todo) {
    throw new ApiError(401, "No todo found with this id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo has been deleted Successfully"));
});

export { getAllTodoById, getAllTodo, createTodo, updateTodo, deleteTodo };
