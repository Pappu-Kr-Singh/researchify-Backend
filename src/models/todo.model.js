import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const todoSchema = new Schema(
  {
    todoName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Completed", "in-progress", "Canceled", "Postponed"],
      default: "in-progress",
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
