import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { RootState, AppDispatch } from "../store/store";
import { createTodo, updateTodo, deleteTodo } from "../store/todo/action";

export const useTodoActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [isCreating, setIsCreating] = useState(false);

  const handleAdd = async (title: string): Promise<void> => {
    try {
      setIsCreating(true);
      const resultAction = await dispatch(createTodo({ title }));

      if (createTodo.fulfilled.match(resultAction)) {
        toast.success("Todo created successfully");
      } else {
        const message =
          (resultAction.payload as string | undefined) ??
          "Failed to create todo";
        toast.error(message);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggle = async (id: string): Promise<void> => {
    const todo = todos.find((t) => t._id === id || t.id === id);
    if (!todo) return;

    const resultAction = await dispatch(
      updateTodo({ id, data: { completed: !todo.completed } }),
    );

    if (updateTodo.fulfilled.match(resultAction)) {
      toast.success("Todo updated successfully");
    } else {
      const message =
        (resultAction.payload as string | undefined) ?? "Failed to update todo";
      toast.error(message);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    const resultAction = await dispatch(deleteTodo(id));

    if (deleteTodo.fulfilled.match(resultAction)) {
      toast.success("Todo deleted successfully");
    } else {
      const message =
        (resultAction.payload as string | undefined) ?? "Failed to delete todo";
      toast.error(message);
    }
  };

  const handleUpdate = async (id: string, title: string): Promise<void> => {
    const resultAction = await dispatch(updateTodo({ id, data: { title } }));

    if (updateTodo.fulfilled.match(resultAction)) {
      toast.success("Todo updated successfully");
    } else {
      const message =
        (resultAction.payload as string | undefined) ?? "Failed to update todo";
      toast.error(message);
    }
  };

  return {
    handleAdd,
    handleToggle,
    handleDelete,
    handleUpdate,
    isCreating,
  };
};
