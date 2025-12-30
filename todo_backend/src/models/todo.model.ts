import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo: Model<ITodo> = mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;
